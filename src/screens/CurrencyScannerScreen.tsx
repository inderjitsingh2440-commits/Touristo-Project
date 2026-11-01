import React, { useState, useRef, useEffect } from 'react';
import { TEST_BANKNOTE_CASES, BanknoteTestCase } from '../data/testBanknotes';
import { 
  scanBanknoteImage, 
  ScanResult, 
  AllowedDenomination,
  VALID_DENOMINATIONS 
} from '../services/scannerService';
import { speechSynthesisService } from '../services/speechSynthesisService';
import { 
  Camera, 
  Volume2, 
  RefreshCw, 
  Upload, 
  AlertCircle, 
  Eye, 
  VideoOff, 
  Crosshair, 
  Loader2, 
  RotateCcw,
  FlaskConical,
  X,
  ArrowRight,
  WifiOff,
  ServerCrash
} from 'lucide-react';

export const CurrencyScannerScreen: React.FC = () => {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isTestDrawerOpen, setIsTestDrawerOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async (mode: 'environment' | 'user' = facingMode) => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported in this browser environment.');
      }

      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: mode, 
          width: { ideal: 1280 }, 
          height: { ideal: 720 } 
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setCameraActive(true);
        };
      }
    } catch (err: any) {
      console.warn('Camera failed:', err);
      setCameraError('Camera access denied or unavailable. Please use Upload Photo or the Test Suite below.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const switchCamera = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    if (cameraActive) {
      startCamera(nextMode);
    }
  };

  /**
   * Unified recognition pipeline:
   * Both live camera frames and gallery uploads pass through this exact function
   */
  const processImageForRecognition = async (dataUrl: string) => {
    if (isScanning) return; // Prevent duplicate concurrent scans

    setIsScanning(true);
    setCapturedPreview(dataUrl);

    try {
      const result = await scanBanknoteImage(dataUrl);
      setScanResult(result);

      // Play audio only if a valid denomination was identified
      if (result.success && result.denomination && result.denomination !== 'Unknown') {
        playDenominationAudio(result.denomination);
      }
    } catch (err: any) {
      console.error('Scan processing error:', err);
      setScanResult({
        success: false,
        error: {
          type: 'image',
          message: err?.message || 'Failed to process image.',
        },
      });
    } finally {
      setIsScanning(false);
    }
  };

  /**
   * Capture photo from live camera stream:
   * Guards against race conditions (video not yet ready, zero dimensions)
   */
  const captureFromCamera = () => {
    if (!videoRef.current) return;

    if (
      videoRef.current.readyState < 2 || 
      !videoRef.current.videoWidth || 
      !videoRef.current.videoHeight
    ) {
      setCameraError('Camera stream is still initializing. Please wait a second and try again.');
      return;
    }

    setCameraError(null);
    const canvas = canvasRef.current || document.createElement('canvas');
    const vw = videoRef.current.videoWidth;
    const vh = videoRef.current.videoHeight;
    canvas.width = vw;
    canvas.height = vh;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setCameraError('Could not allocate canvas for image capture.');
      return;
    }

    ctx.drawImage(videoRef.current, 0, 0, vw, vh);
    const capturedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    processImageForRecognition(capturedDataUrl);
  };

  /**
   * Process uploaded photo from device gallery
   */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        processImageForRecognition(dataUrl);
      }
    };
    reader.onerror = () => {
      setScanResult({
        success: false,
        error: {
          type: 'image',
          message: 'Could not read selected file. Please select a valid photo.',
        },
      });
    };
    reader.readAsDataURL(file);
    // Reset file input so same file can be re-selected if desired
    e.target.value = '';
  };

  /**
   * Run a test specimen from the test procedure
   */
  const runTestCase = (testCase: BanknoteTestCase) => {
    setIsTestDrawerOpen(false);
    processImageForRecognition(testCase.imageDataUrl);
  };

  const playDenominationAudio = async (denom: AllowedDenomination) => {
    if (denom === 'Unknown') return;
    setIsPlayingAudio(true);
    const cleanNum = denom.replace('₹', '');
    await speechSynthesisService.speak(`${cleanNum} Rupees.`, 'en-IN');
    setIsPlayingAudio(false);
  };

  const handleRetake = () => {
    setScanResult(null);
    setCapturedPreview(null);
    if (!cameraActive) {
      startCamera();
    }
  };

  const handleRetry = () => {
    if (capturedPreview) {
      processImageForRecognition(capturedPreview);
    } else {
      handleRetake();
    }
  };

  return (
    <div className="space-y-4 pb-12 animate-in fade-in">
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Banner Notice */}
      <div className="bg-[#E3F2FD] border border-[#BBE3FB] p-3 rounded-2xl flex items-center justify-between text-xs text-[#0A3D62]">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#0277BD] shrink-0" />
          <span>Point camera at any Indian banknote (₹10, ₹20, ₹50, ₹100, ₹200, ₹500)</span>
        </div>
        <button
          onClick={() => setIsTestDrawerOpen(true)}
          className="px-2.5 py-1 rounded-xl bg-white border border-[#BBE3FB] text-[#0277BD] hover:bg-sky-50 font-bold text-[11px] flex items-center gap-1 shadow-xs transition-colors shrink-0"
          title="Open Repeatable Test Suite"
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Test Suite</span>
        </button>
      </div>

      {/* Camera Viewfinder */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-950 rounded-3xl overflow-hidden shadow-xl border-2 border-slate-800 flex items-center justify-center">
        {/* Live Video Feed */}
        <video 
          ref={videoRef} 
          className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`} 
          autoPlay 
          playsInline 
          muted 
        />

        {/* Captured Preview or Placeholder */}
        {!cameraActive && (
          capturedPreview ? (
            <img 
              src={capturedPreview} 
              alt="Scanned banknote" 
              className="w-full h-full object-contain p-2 bg-slate-900"
            />
          ) : (
            <div className="text-center p-6 text-slate-400 text-xs space-y-2">
              <Camera className="w-10 h-10 mx-auto text-slate-600 animate-pulse" />
              <p>Start Camera or Upload Photo to Scan Banknote</p>
            </div>
          )
        )}

        {/* Viewfinder Target Frame with Teal Corners */}
        <div className="absolute inset-4 sm:inset-6 pointer-events-none border border-teal-500/30 rounded-2xl flex items-center justify-center">
          <div className="absolute top-0 left-0 w-7 h-7 border-t-4 border-l-4 border-[#087F68] rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-7 h-7 border-t-4 border-r-4 border-[#087F68] rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-7 h-7 border-b-4 border-l-4 border-[#087F68] rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-7 h-7 border-b-4 border-r-4 border-[#087F68] rounded-br-xl" />

          {/* Animated Laser Scan Line */}
          {isScanning && (
            <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[#087F68] to-transparent animate-scan-line shadow-[0_0_14px_#087F68]" />
          )}

          <div className="w-8 h-8 rounded-full border border-teal-400/40 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#087F68]" />
          </div>
        </div>

        {/* Status Badge in Viewfinder */}
        <div className="absolute top-3 left-3 backdrop-blur-md text-[11px] font-bold px-3 py-1 rounded-full border shadow flex items-center gap-1.5 bg-black/75 text-white border-white/20">
          {isScanning ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-400" />
              <span>Scanning...</span>
            </>
          ) : scanResult?.success && scanResult.denomination ? (
            <span className={scanResult.denomination === 'Unknown' ? 'text-amber-400' : 'text-emerald-400 font-black'}>
              {scanResult.denomination}
            </span>
          ) : scanResult && !scanResult.success ? (
            <span className="text-red-400">Error</span>
          ) : (
            <span className="text-slate-300">Ready</span>
          )}
        </div>

        {/* Viewfinder Camera Controls */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {cameraActive ? (
            <>
              <button
                onClick={switchCamera}
                className="p-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full text-xs backdrop-blur-xs transition-all"
                title="Switch Camera (Front/Rear)"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={stopCamera}
                className="px-3 py-1.5 bg-red-600/90 hover:bg-red-700 text-white rounded-full text-xs font-semibold backdrop-blur-xs shadow flex items-center gap-1 transition-all"
                title="Stop Camera Stream"
              >
                <VideoOff className="w-4 h-4" />
                <span>Stop</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => startCamera()}
              className="px-3.5 py-1.5 bg-[#087F68] hover:bg-[#075B4E] text-white rounded-full text-xs font-bold backdrop-blur-xs shadow-md flex items-center gap-1.5 transition-all"
              title="Activate Device Camera"
            >
              <Camera className="w-4 h-4" />
              <span>Start Camera</span>
            </button>
          )}
        </div>

        {/* Live Capture Trigger Button */}
        {cameraActive && (
          <div className="absolute bottom-3 left-3">
            <button
              onClick={captureFromCamera}
              disabled={isScanning}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-bold backdrop-blur-md shadow-lg flex items-center gap-1.5 active:scale-95 transition-all disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Crosshair className="w-4 h-4" />
                  <span>Capture & Identify</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {cameraError && (
        <div className="text-xs text-amber-800 bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* ONE-WORD RESULT DISPLAY AREA (Strictly No Paragraphs or Explanations) */}
      {scanResult?.success && scanResult.denomination && (
        <div className="bg-white rounded-3xl border border-[#E2E8E6] p-6 shadow-sm text-center space-y-3 animate-in fade-in">
          <div className="text-xs uppercase tracking-wider font-semibold text-[#62716F]">
            Scanned Denomination
          </div>
          
          <div className={`text-5xl sm:text-6xl font-black tracking-tight ${
            scanResult.denomination === 'Unknown' ? 'text-amber-600' : 'text-[#087F68]'
          }`}>
            {scanResult.denomination}
          </div>

          {/* Action on Result: Retake on Unknown, Pronounce on Valid Denomination */}
          {scanResult.denomination === 'Unknown' ? (
            <div className="pt-2">
              <button
                onClick={handleRetake}
                className="w-full py-3 bg-[#087F68] hover:bg-[#075B4E] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => playDenominationAudio(scanResult.denomination!)}
                disabled={isPlayingAudio}
                className="px-4 py-2.5 bg-[#087F68] hover:bg-[#075B4E] text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 disabled:opacity-60"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingAudio ? 'Speaking...' : 'Listen'}</span>
              </button>
              <button
                onClick={handleRetake}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Scan Another</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* SPECIFIC ERROR CARD (For Camera, Network, API, or File Failures) */}
      {scanResult && !scanResult.success && scanResult.error && (
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-4 text-rose-950 shadow-sm space-y-3 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
              {scanResult.error.type === 'network' ? (
                <WifiOff className="w-5 h-5" />
              ) : scanResult.error.type === 'api' ? (
                <ServerCrash className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-sm">
                {scanResult.error.type === 'network'
                  ? 'Network Connection Error'
                  : scanResult.error.type === 'timeout'
                  ? 'Request Timed Out'
                  : scanResult.error.type === 'api'
                  ? 'Recognition Service Error'
                  : 'Image Processing Error'}
              </h4>
              <p className="text-xs text-rose-800 leading-relaxed">
                {scanResult.error.message}
              </p>
            </div>
          </div>

          <div className="pt-1 flex gap-2">
            <button
              onClick={handleRetry}
              className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
            <button
              onClick={handleRetake}
              className="px-4 py-2.5 bg-white border border-rose-200 text-rose-900 font-bold rounded-xl text-xs hover:bg-rose-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Scan Actions (Scan from Camera or Upload Photo) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          {cameraActive ? (
            <button
              onClick={captureFromCamera}
              disabled={isScanning}
              className="flex-1 py-3.5 bg-[#07866D] hover:bg-[#075B4E] text-white font-bold rounded-2xl text-xs shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crosshair className="w-4 h-4" />}
              <span>{isScanning ? 'Scanning...' : 'Capture & Identify Note'}</span>
            </button>
          ) : (
            <button
              onClick={() => startCamera()}
              className="flex-1 py-3.5 bg-[#07866D] hover:bg-[#075B4E] text-white font-bold rounded-2xl text-xs shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Open Camera Scanner</span>
            </button>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isScanning}
            className="px-4 py-3.5 bg-white hover:bg-[#F5F7F7] border border-[#E2E8E6] text-[#075B4E] font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
            title="Upload Banknote Photo from Gallery"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        {/* Test Suite Trigger Strip */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8E6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#172B2A]">
                Repeatable Test Suite (Both Sides)
              </div>
              <div className="text-[10px] text-[#62716F]">
                Verify all 6 denominations: ₹10, ₹20, ₹50, ₹100, ₹200, ₹500
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsTestDrawerOpen(true)}
            className="px-3 py-1.5 bg-[#087F68] hover:bg-[#075B4E] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1 shadow-xs"
          >
            <span>Run Tests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* TEST SUITE DRAWER / MODAL */}
      {isTestDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] shadow-2xl border border-[#E2E8E6] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-[#E2E8E6] flex items-center justify-between bg-[#F5F7F7]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#172B2A] uppercase tracking-wider">
                    Banknote Verification Test Procedure
                  </h3>
                  <p className="text-[11px] text-[#62716F]">
                    Tests Front and Reverse of ₹10, ₹20, ₹50, ₹100, ₹200, ₹500 & Edge Cases
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsTestDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2.5">
              <p className="text-xs text-slate-600 leading-relaxed">
                Click any specimen below to run it through the recognition pipeline and verify that ₹10, ₹20, ₹50, ₹100, ₹200, and ₹500 return their exact single-word token, and blurred notes return Unknown:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {TEST_BANKNOTE_CASES.map((tc) => (
                  <button
                    key={tc.id}
                    onClick={() => runTestCase(tc)}
                    className="p-3 rounded-2xl border border-[#E2E8E6] bg-[#F5F7F7] hover:bg-[#E6F6EF] hover:border-[#087F68] text-left transition-all group flex flex-col justify-between space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-[#172B2A] group-hover:text-[#087F68]">
                        {tc.expectedDenomination}
                      </span>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                        {tc.side}
                      </span>
                    </div>

                    <div className="text-[11px] font-semibold text-slate-700 line-clamp-1">
                      {tc.name}
                    </div>

                    <div className="text-[10px] text-slate-500 line-clamp-1">
                      {tc.monumentOrFeatures}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 border-t border-[#E2E8E6] bg-[#F5F7F7] text-center">
              <button
                onClick={() => setIsTestDrawerOpen(false)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Close Test Suite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
