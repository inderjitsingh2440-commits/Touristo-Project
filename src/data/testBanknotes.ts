import { AllowedDenomination } from '../services/scannerService';

export interface BanknoteTestCase {
  id: string;
  denomination: number;
  side: 'front' | 'reverse';
  name: string;
  expectedDenomination: AllowedDenomination;
  colorName: string;
  monumentOrFeatures: string;
  imageDataUrl: string;
}

// Generate realistic banknote test image data URLs with crisp numerals and monuments
function createTestBanknoteSvg(
  denominationNum: number,
  side: 'front' | 'reverse',
  bgColor: string,
  accentColor: string,
  monumentText: string,
  englishWords: string,
  hindiWords: string,
  devanagariNumeral: string,
  isObscured: boolean = false
): string {
  const width = 600;
  const height = 300;

  if (isObscured) {
    const obscuredContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="#334155"/>
      <circle cx="300" cy="150" r="100" fill="#64748b" opacity="0.4"/>
      <text x="300" y="155" fill="#94a3b8" font-size="16" font-family="sans-serif" text-anchor="middle">BLURRED / UNREADABLE NOTE</text>
    </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(obscuredContent)}`;
  }

  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${bgColor}" rx="16" stroke="${accentColor}" stroke-width="6"/>
    <rect x="16" y="16" width="${width - 32}" height="${height - 32}" fill="none" stroke="${accentColor}" stroke-dasharray="10 6" stroke-width="2.5" rx="10"/>
    
    <!-- Watermark / Security Strip -->
    <rect x="45" y="30" width="85" height="${height - 60}" fill="#ffffff" opacity="0.18" rx="8"/>
    <circle cx="87" cy="150" r="32" fill="#ffffff" opacity="0.28"/>
    <text x="87" y="155" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">RBI</text>
    
    <!-- Header -->
    <text x="160" y="55" fill="#ffffff" font-size="14" font-family="sans-serif" font-weight="bold" letter-spacing="1">RESERVE BANK OF INDIA · भारतीय रिज़र्व बैंक</text>
    <text x="160" y="75" fill="#ffffff" font-size="10" font-family="sans-serif" opacity="0.9">GUARANTEED BY THE CENTRAL GOVERNMENT</text>
    <text x="160" y="95" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="600">${englishWords} · ${hindiWords}</text>
    
    ${side === 'front' 
      ? `<!-- Front Side: Mahatma Gandhi Portrait & Western + Devanagari Numerals -->
         <text x="160" y="180" fill="#ffffff" font-size="56" font-family="sans-serif" font-weight="900" letter-spacing="2">₹${denominationNum}</text>
         <text x="390" y="175" fill="#ffffff" font-size="36" font-family="sans-serif" font-weight="bold">₹${devanagariNumeral}</text>
         <text x="160" y="220" fill="#ffffff" font-size="16" font-family="sans-serif" font-weight="bold">MAHATMA GANDHI SERIES</text>
         <!-- Security Thread -->
         <rect x="320" y="85" width="18" height="150" fill="#059669" opacity="0.85" rx="3"/>
         <text x="329" y="160" fill="#ffffff" font-size="9" font-family="sans-serif" font-weight="bold" transform="rotate(-90 329 160)">RBI भारत</text>`
      : `<!-- Reverse Side: Heritage Monument Motif & Western + Devanagari Numeral -->
         <text x="160" y="160" fill="#ffffff" font-size="44" font-family="sans-serif" font-weight="900">₹${denominationNum}</text>
         <text x="360" y="155" fill="#ffffff" font-size="32" font-family="sans-serif" font-weight="bold">₹${devanagariNumeral}</text>
         <rect x="160" y="180" width="300" height="52" fill="#000000" opacity="0.3" rx="8"/>
         <text x="175" y="204" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="bold">MOTIF: ${monumentText}</text>
         <text x="175" y="222" fill="#ffffff" font-size="10" font-family="sans-serif" opacity="0.85">HERITAGE SITE OF INDIA</text>`
    }
    <text x="45" y="${height - 24}" fill="#ffffff" font-size="11" font-family="monospace" opacity="0.85">SPECIMEN TEST NOTE</text>
    <text x="${width - 45}" y="${height - 24}" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="900" text-anchor="end">₹${denominationNum}</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(content)}`;
}

export const TEST_BANKNOTE_CASES: BanknoteTestCase[] = [
  // ₹10 Test Cases (Front & Reverse) - Chocolate Brown, Konark Wheel
  {
    id: 'test-10-front',
    denomination: 10,
    side: 'front',
    name: '₹10 Note (Front Side - Gandhi Portrait & ₹10 Numeral)',
    expectedDenomination: '₹10',
    colorName: 'Chocolate Brown',
    monumentOrFeatures: 'Konark Sun Temple wheel motif, numeral 10, Devanagari १०',
    imageDataUrl: createTestBanknoteSvg(
      10,
      'front',
      '#5D4037',
      '#BCAAA4',
      'Sun Temple Konark',
      'TEN RUPEES',
      'दस रुपये',
      '१०'
    ),
  },
  {
    id: 'test-10-rev',
    denomination: 10,
    side: 'reverse',
    name: '₹10 Note (Reverse Side - Sun Temple Konark Wheel)',
    expectedDenomination: '₹10',
    colorName: 'Chocolate Brown',
    monumentOrFeatures: 'Sun Temple Konark (Odisha) wheel motif, numeral 10',
    imageDataUrl: createTestBanknoteSvg(
      10,
      'reverse',
      '#5D4037',
      '#BCAAA4',
      'Sun Temple Konark',
      'TEN RUPEES',
      'दस रुपये',
      '१०'
    ),
  },

  // ₹20 Test Cases (Front & Reverse) - Greenish Yellow, Ellora Caves
  {
    id: 'test-20-front',
    denomination: 20,
    side: 'front',
    name: '₹20 Note (Front Side - Gandhi Portrait & ₹20 Numeral)',
    expectedDenomination: '₹20',
    colorName: 'Greenish Yellow',
    monumentOrFeatures: 'Ellora Caves motif, numeral 20, Devanagari २०',
    imageDataUrl: createTestBanknoteSvg(
      20,
      'front',
      '#827717',
      '#E6EE9C',
      'Ellora Caves',
      'TWENTY RUPEES',
      'बीस रुपये',
      '२०'
    ),
  },
  {
    id: 'test-20-rev',
    denomination: 20,
    side: 'reverse',
    name: '₹20 Note (Reverse Side - Ellora Caves Motif)',
    expectedDenomination: '₹20',
    colorName: 'Greenish Yellow',
    monumentOrFeatures: 'Ellora Caves (Maharashtra) cultural motif, numeral 20',
    imageDataUrl: createTestBanknoteSvg(
      20,
      'reverse',
      '#827717',
      '#E6EE9C',
      'Ellora Caves',
      'TWENTY RUPEES',
      'बीस रुपये',
      '२०'
    ),
  },

  // ₹50 Test Cases (Front & Reverse) - Fluorescent Blue, Hampi Chariot
  {
    id: 'test-50-front',
    denomination: 50,
    side: 'front',
    name: '₹50 Note (Front Side - Gandhi Portrait & ₹50 Numeral)',
    expectedDenomination: '₹50',
    colorName: 'Fluorescent Blue',
    monumentOrFeatures: 'Hampi Chariot motif, numeral 50, Devanagari ५०',
    imageDataUrl: createTestBanknoteSvg(
      50,
      'front',
      '#00838F',
      '#B2EBF2',
      'Stone Chariot Hampi',
      'FIFTY RUPEES',
      'पचास रुपये',
      '५०'
    ),
  },
  {
    id: 'test-50-rev',
    denomination: 50,
    side: 'reverse',
    name: '₹50 Note (Reverse Side - Stone Chariot Hampi)',
    expectedDenomination: '₹50',
    colorName: 'Fluorescent Blue',
    monumentOrFeatures: 'Stone Chariot Hampi (Karnataka) motif, numeral 50',
    imageDataUrl: createTestBanknoteSvg(
      50,
      'reverse',
      '#00838F',
      '#B2EBF2',
      'Stone Chariot Hampi',
      'FIFTY RUPEES',
      'पचास रुपये',
      '५०'
    ),
  },

  // ₹100 Test Cases (Front & Reverse) - Lavender, Rani ki Vav Stepwell
  {
    id: 'test-100-front',
    denomination: 100,
    side: 'front',
    name: '₹100 Note (Front Side - Gandhi Portrait & ₹100 Numeral)',
    expectedDenomination: '₹100',
    colorName: 'Lavender',
    monumentOrFeatures: 'Rani ki Vav stepwell motif, numeral 100, Devanagari १००',
    imageDataUrl: createTestBanknoteSvg(
      100,
      'front',
      '#6A1B9A',
      '#E1BEE7',
      'Rani ki Vav',
      'ONE HUNDRED RUPEES',
      'एक सौ रुपये',
      '१००'
    ),
  },
  {
    id: 'test-100-rev',
    denomination: 100,
    side: 'reverse',
    name: '₹100 Note (Reverse Side - Rani ki Vav Stepwell)',
    expectedDenomination: '₹100',
    colorName: 'Lavender',
    monumentOrFeatures: 'Rani ki Vav stepwell motif (Patan, Gujarat), numeral 100',
    imageDataUrl: createTestBanknoteSvg(
      100,
      'reverse',
      '#6A1B9A',
      '#E1BEE7',
      'Rani ki Vav',
      'ONE HUNDRED RUPEES',
      'एक सौ रुपये',
      '१००'
    ),
  },

  // ₹200 Test Cases (Front & Reverse) - Bright Yellow, Sanchi Stupa
  {
    id: 'test-200-front',
    denomination: 200,
    side: 'front',
    name: '₹200 Note (Front Side - Gandhi Portrait & ₹200 Numeral)',
    expectedDenomination: '₹200',
    colorName: 'Bright Yellow',
    monumentOrFeatures: 'Sanchi Stupa motif, numeral 200, Devanagari २००',
    imageDataUrl: createTestBanknoteSvg(
      200,
      'front',
      '#E65100',
      '#FFE082',
      'Sanchi Stupa',
      'TWO HUNDRED RUPEES',
      'दो सौ रुपये',
      '२००'
    ),
  },
  {
    id: 'test-200-rev',
    denomination: 200,
    side: 'reverse',
    name: '₹200 Note (Reverse Side - Sanchi Stupa Motif)',
    expectedDenomination: '₹200',
    colorName: 'Bright Yellow',
    monumentOrFeatures: 'Sanchi Stupa (Madhya Pradesh) Buddhist motif, numeral 200',
    imageDataUrl: createTestBanknoteSvg(
      200,
      'reverse',
      '#E65100',
      '#FFE082',
      'Sanchi Stupa',
      'TWO HUNDRED RUPEES',
      'दो सौ रुपये',
      '२००'
    ),
  },

  // ₹500 Test Cases (Front & Reverse) - Stone Grey, Red Fort Delhi
  {
    id: 'test-500-front',
    denomination: 500,
    side: 'front',
    name: '₹500 Note (Front Side - Gandhi Portrait & ₹500 Numeral)',
    expectedDenomination: '₹500',
    colorName: 'Stone Grey',
    monumentOrFeatures: 'Red Fort motif, numeral 500, Devanagari ५००',
    imageDataUrl: createTestBanknoteSvg(
      500,
      'front',
      '#424242',
      '#CFD8DC',
      'Red Fort Delhi',
      'FIVE HUNDRED RUPEES',
      'पाँच सौ रुपये',
      '५००'
    ),
  },
  {
    id: 'test-500-rev',
    denomination: 500,
    side: 'reverse',
    name: '₹500 Note (Reverse Side - Red Fort Delhi with Flag)',
    expectedDenomination: '₹500',
    colorName: 'Stone Grey',
    monumentOrFeatures: 'Red Fort heritage site motif with Indian flag, numeral 500',
    imageDataUrl: createTestBanknoteSvg(
      500,
      'reverse',
      '#424242',
      '#CFD8DC',
      'Red Fort Delhi',
      'FIVE HUNDRED RUPEES',
      'पाँच सौ रुपये',
      '५००'
    ),
  },

  // Ambiguous / Edge Cases
  {
    id: 'test-blurry-retake',
    denomination: 0,
    side: 'front',
    name: 'Blurry / Obscured Photograph (Triggers Unknown & Retake)',
    expectedDenomination: 'Unknown',
    colorName: 'Unclear',
    monumentOrFeatures: 'Numerals obscured by blur; returns Unknown with Retake button',
    imageDataUrl: createTestBanknoteSvg(
      0,
      'front',
      '#334155',
      '#64748b',
      'Obscured',
      '',
      '',
      '',
      true
    ),
  },
];
