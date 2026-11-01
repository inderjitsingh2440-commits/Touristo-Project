/**
 * Shared Banknote Scanner Service
 * High-speed image optimization, concurrency control, and unified single-token recognition.
 */

export type AllowedDenomination = '₹10' | '₹20' | '₹50' | '₹100' | '₹200' | '₹500' | 'Unknown';

export const VALID_DENOMINATIONS: readonly AllowedDenomination[] = [
  '₹10',
  '₹20',
  '₹50',
  '₹100',
  '₹200',
  '₹500',
  'Unknown',
] as const;

export const KNOWN_DENOMINATIONS: readonly AllowedDenomination[] = [
  '₹10',
  '₹20',
  '₹50',
  '₹100',
  '₹200',
  '₹500',
] as const;

export interface ScanResult {
  success: boolean;
  denomination?: AllowedDenomination;
  error?: {
    type: 'camera' | 'network' | 'api' | 'timeout' | 'image';
    message: string;
  };
}

let activeAbortController: AbortController | null = null;

/**
 * Ensures image is completely loaded into browser memory before analysis.
 * Prevents race conditions with unrendered or zero-dimension canvases.
 */
export function loadImageAsync(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    const timer = setTimeout(() => {
      reject(new Error('Image loading timed out. Please choose a valid image file.'));
    }, 6000);

    img.onload = () => {
      clearTimeout(timer);
      if (img.naturalWidth === 0 || img.naturalHeight === 0) {
        reject(new Error('Image has zero dimensions or unrendered pixels.'));
      } else {
        resolve(img);
      }
    };

    img.onerror = () => {
      clearTimeout(timer);
      reject(new Error('Failed to load image into browser memory. Please select a valid photo.'));
    };

    img.src = src;
  });
}

/**
 * Optimizes image for rapid API transmission:
 * Downscales large photos (e.g. 12-48MP smartphone photos) to max 1200px while
 * preserving crisp denomination numerals, converting to lightweight JPEG.
 * Reduces transmission payload from ~10MB+ down to ~120KB.
 */
export function optimizeImageForScan(
  img: HTMLImageElement,
  maxDimension: number = 1200,
  quality: number = 0.85
): { dataUrl: string; base64: string; mimeType: string } {
  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;

  if (width === 0 || height === 0) {
    throw new Error('Image dimensions cannot be zero');
  }

  if (width > maxDimension || height > maxDimension) {
    if (width > height) {
      height = Math.round((height * maxDimension) / width);
      width = maxDimension;
    } else {
      width = Math.round((width * maxDimension) / height);
      height = maxDimension;
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not create off-screen canvas context');
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  const dataUrl = canvas.toDataURL('image/jpeg', quality);
  const base64 = dataUrl.replace(/^data:image\/jpeg;base64,/, '');

  return {
    dataUrl,
    base64,
    mimeType: 'image/jpeg',
  };
}

/**
 * Unified Recognition Pipeline:
 * Both live camera capture and gallery uploads pass through this exact function.
 */
export async function scanBanknoteImage(
  dataUrlOrBase64: string,
  _explicitMimeType?: string
): Promise<ScanResult> {
  // Cancel any prior in-flight scan to prevent race conditions & duplicate requests
  if (activeAbortController) {
    activeAbortController.abort();
    activeAbortController = null;
  }

  const controller = new AbortController();
  activeAbortController = controller;

  // 12-second timeout
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 12000);

  try {
    // 1. Verify image loads properly and optimize size
    let cleanDataUrl = dataUrlOrBase64;
    if (!cleanDataUrl.startsWith('data:')) {
      cleanDataUrl = `data:image/jpeg;base64,${dataUrlOrBase64}`;
    }

    const loadedImg = await loadImageAsync(cleanDataUrl);
    const optimized = optimizeImageForScan(loadedImg, 1200, 0.85);

    // 2. Transmit to server recognition endpoint
    const response = await fetch('/api/scan-banknote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageBase64: optimized.base64,
        mimeType: optimized.mimeType,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errJson = await response.json().catch(() => null);
      return {
        success: false,
        error: {
          type: 'api',
          message: errJson?.error || `Server responded with status ${response.status}`,
        },
      };
    }

    const data = await response.json();
    const rawDenom = data?.denomination;

    // Strict validation: must be one of allowed single-word tokens
    const validatedDenom: AllowedDenomination = VALID_DENOMINATIONS.includes(rawDenom)
      ? rawDenom
      : 'Unknown';

    return {
      success: true,
      denomination: validatedDenom,
    };
  } catch (err: any) {
    clearTimeout(timeoutId);

    if (err?.name === 'AbortError') {
      return {
        success: false,
        error: {
          type: 'timeout',
          message: 'The scan request timed out. Please check your network and try again.',
        },
      };
    }

    if (err?.message?.includes('Failed to fetch') || err?.message?.includes('NetworkError')) {
      return {
        success: false,
        error: {
          type: 'network',
          message: 'Network error. Please check your internet connection.',
        },
      };
    }

    return {
      success: false,
      error: {
        type: 'image',
        message: err?.message || 'Failed to process image.',
      },
    };
  } finally {
    if (activeAbortController === controller) {
      activeAbortController = null;
    }
  }
}
