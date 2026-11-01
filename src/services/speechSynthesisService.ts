/**
 * Text-to-Speech & Voice Recognition Service using Web Speech APIs
 * Supports multi-language speech in native target language.
 */

const getVoicesAsync = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([]);
      return;
    }
    let voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    const onVoicesChanged = () => {
      voices = window.speechSynthesis.getVoices();
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      resolve(voices);
    };
    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    setTimeout(() => {
      resolve(window.speechSynthesis.getVoices());
    }, 350);
  });
};

const LANG_MAP: Record<string, string> = {
  hi: 'hi-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  pa: 'pa-IN',
  ur: 'ur-PK',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  ja: 'ja-JP',
  zh: 'zh-CN',
  ar: 'ar-SA',
  ru: 'ru-RU',
  ko: 'ko-KR',
  it: 'it-IT',
  en: 'en-IN',
};

export const speechSynthesisService = {
  async speak(text: string, langCode: string = 'en-IN'): Promise<void> {
    if (!('speechSynthesis' in window) || !text.trim()) {
      return;
    }

    window.speechSynthesis.cancel(); // Stop any ongoing utterance

    // Map to full BCP-47 speech code
    const targetLang = LANG_MAP[langCode.toLowerCase()] || langCode;
    const prefix = targetLang.split('-')[0].toLowerCase();

    // Clean text: Strip brackets, phonetic hints, and English prefixes
    let cleanText = text
      .replace(/\[.*?\]:?/g, '')       // strip [Language]:
      .replace(/\(.*?\)/g, '')         // strip (phonetic romanized text)
      .replace(/["']/g, '')            // strip quotes
      .trim();

    if (!cleanText) {
      cleanText = text.trim();
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = targetLang;
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    const voices = await getVoicesAsync();
    if (voices.length > 0) {
      // Find matching voice by full code or prefix
      const matchingVoice =
        voices.find((v) => v.lang.toLowerCase() === targetLang.toLowerCase()) ||
        voices.find((v) => v.lang.toLowerCase().startsWith(prefix));

      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }
    }

    return new Promise((resolve) => {
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  },

  stop(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  },

  createRecognition(
    langCode: string,
    onResult: (text: string) => void,
    onError: (err: string) => void
  ): { start: () => void; stop: () => void } | null {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return null;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      const targetLang = LANG_MAP[langCode.toLowerCase()] || langCode;
      recognition.lang = targetLang;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      recognition.onerror = (event: any) => {
        onError(event.error || 'Speech recognition error');
      };

      return {
        start: () => recognition.start(),
        stop: () => recognition.stop(),
      };
    } catch (e: any) {
      onError(e.message || 'Microphone initialization failed');
      return null;
    }
  },
};
