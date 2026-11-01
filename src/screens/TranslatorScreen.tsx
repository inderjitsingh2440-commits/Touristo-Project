import React, { useState, useEffect } from 'react';
import { 
  SUPPORTED_LANGUAGES, 
  translateTextAsync, 
  LanguageOption, 
  MULTILINGUAL_DICTIONARY 
} from '../services/translationLanguages';
import { speechSynthesisService } from '../services/speechSynthesisService';
import { 
  ArrowLeftRight, 
  Mic, 
  Volume2, 
  Copy, 
  Trash2, 
  Check, 
  MessageSquare, 
  Compass, 
  Sparkles, 
  ShoppingBag, 
  Car, 
  AlertTriangle, 
  Send, 
  HelpCircle, 
  Coffee,
  Loader2
} from 'lucide-react';

interface ConversationTurn {
  id: string;
  sender: 'traveler' | 'local';
  originalText: string;
  translatedText: string;
  pronunciation?: string;
  fromLang: string;
  toLang: string;
}

export const TranslatorScreen: React.FC = () => {
  const [mode, setMode] = useState<'text' | 'voice' | 'conversation'>('text');
  const [sourceLang, setSourceLang] = useState<string>('en');
  const [targetLang, setTargetLang] = useState<string>('hi');
  const [inputText, setInputText] = useState('');
  const [translatedNative, setTranslatedNative] = useState('');
  const [translatedPhonetic, setTranslatedPhonetic] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  // Conversation Mode State
  const [convoHistory, setConvoHistory] = useState<ConversationTurn[]>([
    {
      id: '1',
      sender: 'traveler',
      originalText: 'Hello! Please run by the meter.',
      translatedText: 'कृपया मीटर से चलें।',
      pronunciation: 'Kripya meter se chalien',
      fromLang: 'en',
      toLang: 'hi',
    },
    {
      id: '2',
      sender: 'local',
      originalText: 'कनॉट प्लेस के लिए डेढ़ सौ रुपये लगेंगे।',
      translatedText: 'It will cost one hundred and fifty rupees for Connaught Place.',
      pronunciation: '',
      fromLang: 'hi',
      toLang: 'en',
    },
  ]);
  const [convoInput, setConvoInput] = useState('');
  const [activeSpeaker, setActiveSpeaker] = useState<'traveler' | 'local'>('traveler');

  // Perform translation
  const handleTranslate = async (text: string, src: string, tgt: string) => {
    if (!text.trim()) {
      setTranslatedNative('');
      setTranslatedPhonetic('');
      return;
    }

    setIsTranslating(true);
    try {
      const res = await translateTextAsync(text, src, tgt);
      setTranslatedNative(res.translatedText);
      setTranslatedPhonetic(res.pronunciation || '');
    } catch {
      setTranslatedNative(text);
      setTranslatedPhonetic('');
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputText) {
        handleTranslate(inputText, sourceLang, targetLang);
      } else {
        setTranslatedNative('');
        setTranslatedPhonetic('');
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [inputText, sourceLang, targetLang]);

  const swapLanguages = () => {
    const prevSrc = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(prevSrc);
    setInputText(translatedNative || '');
  };

  const startVoiceInput = () => {
    setMicError(null);
    setIsListening(true);

    const recognition = speechSynthesisService.createRecognition(
      sourceLang,
      (transcript) => {
        setInputText(transcript);
        setIsListening(false);
      },
      (err) => {
        setIsListening(false);
        setMicError(`Voice input: ${err}. Try typing or selecting a travel phrase below.`);
      }
    );

    if (recognition) {
      recognition.start();
    } else {
      setTimeout(() => {
        setIsListening(false);
        setInputText(sourceLang === 'en' ? 'Where is the nearest metro station?' : 'कृपया मीटर से चलें');
      }, 1200);
    }
  };

  /**
   * Speaks STRICTLY in the translated language
   * Text is pure native target language script, audio voice is matched to target language
   */
  const playTargetTTS = async () => {
    if (!translatedNative || isSpeaking) return;
    setIsSpeaking(true);
    await speechSynthesisService.speak(translatedNative, targetLang);
    setIsSpeaking(false);
  };

  const playSourceTTS = async () => {
    if (!inputText) return;
    await speechSynthesisService.speak(inputText, sourceLang);
  };

  const handleCopy = () => {
    if (translatedNative) {
      navigator.clipboard.writeText(translatedNative);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendConvo = async () => {
    if (!convoInput.trim()) return;

    const fromL = activeSpeaker === 'traveler' ? sourceLang : targetLang;
    const toL = activeSpeaker === 'traveler' ? targetLang : sourceLang;
    
    const res = await translateTextAsync(convoInput, fromL, toL);

    const newTurn: ConversationTurn = {
      id: Date.now().toString(),
      sender: activeSpeaker,
      originalText: convoInput,
      translatedText: res.translatedText,
      pronunciation: res.pronunciation,
      fromLang: fromL,
      toLang: toL,
    };

    setConvoHistory((prev) => [...prev, newTurn]);
    setConvoInput('');
    setActiveSpeaker((prev) => (prev === 'traveler' ? 'local' : 'traveler'));

    // Speak translated response in destination language
    await speechSynthesisService.speak(res.translatedText, toL);
  };

  const currentSourceObj = SUPPORTED_LANGUAGES.find((l) => l.code === sourceLang) || SUPPORTED_LANGUAGES[0];
  const currentTargetObj = SUPPORTED_LANGUAGES.find((l) => l.code === targetLang) || SUPPORTED_LANGUAGES[1];

  return (
    <div className="space-y-4 pb-12 animate-in fade-in">
      {/* 3 Modes Segmented Control */}
      <div className="flex items-center p-1 bg-white border border-[#E2E8E6] rounded-2xl shadow-xs">
        <button
          onClick={() => setMode('text')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === 'text'
              ? 'bg-[#087F68] text-white shadow-xs'
              : 'text-[#62716F] hover:text-[#172B2A]'
          }`}
        >
          Text Mode
        </button>
        <button
          onClick={() => setMode('voice')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === 'voice'
              ? 'bg-[#087F68] text-white shadow-xs'
              : 'text-[#62716F] hover:text-[#172B2A]'
          }`}
        >
          Voice Mode
        </button>
        <button
          onClick={() => setMode('conversation')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === 'conversation'
              ? 'bg-[#087F68] text-white shadow-xs'
              : 'text-[#62716F] hover:text-[#172B2A]'
          }`}
        >
          Conversation
        </button>
      </div>

      {/* Multi-Language Dropdowns */}
      <div className="bg-white p-3 rounded-2xl border border-[#E2E8E6] flex items-center justify-between gap-2 shadow-xs">
        <div className="flex-1">
          <label className="text-[10px] font-bold text-[#62716F] block mb-0.5">Translate From</label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full bg-[#F5F7F7] border border-[#E2E8E6] font-bold text-xs text-[#172B2A] rounded-xl px-2 py-2 focus:outline-none focus:border-[#087F68]"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flagEmoji} {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={swapLanguages}
          className="p-2 rounded-xl bg-[#E6F6EF] text-[#087F68] hover:bg-[#087F68] hover:text-white transition-colors mt-3 shrink-0"
          title="Swap Languages"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>

        <div className="flex-1">
          <label className="text-[10px] font-bold text-[#62716F] block mb-0.5">Translate To</label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full bg-[#E6F6EF]/60 border border-teal-200 font-bold text-xs text-[#087F68] rounded-xl px-2 py-2 focus:outline-none focus:border-[#087F68]"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flagEmoji} {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {micError && (
        <div className="text-xs text-amber-800 bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
          {micError}
        </div>
      )}

      {/* Text & Voice Mode Interface */}
      {mode !== 'conversation' ? (
        <div className="space-y-3">
          {/* Input Box */}
          <div className="bg-white rounded-3xl border border-[#E2E8E6] p-4 shadow-xs relative">
            <div className="flex items-center justify-between text-xs text-[#62716F] mb-1 font-semibold">
              <span className="flex items-center gap-1.5">
                <span>{currentSourceObj.flagEmoji}</span>
                <span>Enter text in {currentSourceObj.name}</span>
              </span>
              {inputText && (
                <button
                  onClick={() => setInputText('')}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Type or speak in ${currentSourceObj.name}: e.g. "Where is the metro station?" or "Please run by meter"`}
              rows={3}
              className="w-full text-sm font-medium text-[#172B2A] placeholder-slate-400 resize-none focus:outline-none"
            />

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[10px] text-slate-400">
                {inputText.length} characters
              </span>
              <button
                onClick={playSourceTTS}
                disabled={!inputText}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                title={`Listen to original ${currentSourceObj.name} text`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Voice Waveform Animation when Listening */}
          {isListening && (
            <div className="p-4 bg-[#E6F6EF] rounded-3xl border border-teal-200 flex flex-col items-center justify-center space-y-2 animate-in fade-in">
              <div className="flex items-center gap-1.5 h-8">
                <span className="w-1.5 bg-[#087F68] h-4 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 bg-[#087F68] h-7 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 bg-[#087F68] h-5 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="w-1.5 bg-[#087F68] h-8 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
                <span className="w-1.5 bg-[#087F68] h-3 rounded-full animate-bounce" style={{ animationDelay: '250ms' }} />
              </div>
              <span className="text-xs font-bold text-[#087F68]">
                Listening to speech in {currentSourceObj.name} ({currentSourceObj.nativeName})...
              </span>
            </div>
          )}

          {/* Voice Action Button for Voice Mode */}
          {mode === 'voice' && (
            <div className="flex justify-center py-2">
              <button
                onClick={startVoiceInput}
                disabled={isListening}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90 ${
                  isListening
                    ? 'bg-red-500 text-white ring-8 ring-red-100 animate-pulse'
                    : 'bg-[#087F68] hover:bg-[#075B4E] text-white ring-8 ring-[#E6F6EF]'
                }`}
                title="Press and Speak"
              >
                <Mic className="w-8 h-8" />
              </button>
            </div>
          )}

          {/* Translated Result Card: Speaks STRICTLY in the translated language! */}
          <div className="bg-[#E3F2FD] rounded-3xl border border-[#BBE3FB] p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#0277BD]">
              <span className="flex items-center gap-1.5">
                <span>{currentTargetObj.flagEmoji}</span>
                <span>{currentTargetObj.name} ({currentTargetObj.nativeName}) Translation</span>
                {isTranslating && <Loader2 className="w-3.5 h-3.5 animate-spin ml-1 text-[#0277BD]" />}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleCopy}
                  disabled={!translatedNative}
                  className="p-1.5 rounded-lg hover:bg-sky-200/60 text-[#0277BD] transition-colors"
                  title="Copy Translation"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={playTargetTTS}
                  disabled={!translatedNative || isSpeaking}
                  className={`p-1.5 rounded-lg transition-all flex items-center gap-1 ${
                    isSpeaking 
                      ? 'bg-[#087F68] text-white shadow-xs' 
                      : 'hover:bg-sky-200/60 text-[#0277BD]'
                  }`}
                  title={`Speak in ${currentTargetObj.name} (${currentTargetObj.nativeName})`}
                >
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                  <span className="text-[11px] font-bold">
                    {isSpeaking ? `Speaking ${currentTargetObj.name}...` : 'Listen'}
                  </span>
                </button>
              </div>
            </div>

            <div className="min-h-[64px] flex flex-col justify-center">
              {translatedNative ? (
                <>
                  {/* Pure translation in native script only */}
                  <p className="text-lg font-black text-[#0A3D62] leading-relaxed">
                    {translatedNative}
                  </p>
                  {/* Separate Phonetic Guide */}
                  {translatedPhonetic && (
                    <p className="text-xs text-[#24618A] font-medium mt-1 italic">
                      Pronunciation: {translatedPhonetic}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-xs text-[#24618A]/70 italic">
                  Translation will appear here in {currentTargetObj.name} ({currentTargetObj.nativeName}). Tap "Listen" to hear it pronounced natively.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Conversation Mode */
        <div className="space-y-3">
          <div className="bg-white rounded-3xl border border-[#E2E8E6] p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#172B2A] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#087F68]" />
                Live Conversation Mode
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveSpeaker('traveler')}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-colors ${
                    activeSpeaker === 'traveler'
                      ? 'bg-[#087F68] text-white shadow-xs'
                      : 'bg-[#F5F7F7] text-[#62716F]'
                  }`}
                >
                  Tourist ({currentSourceObj.name})
                </button>
                <button
                  onClick={() => setActiveSpeaker('local')}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-colors ${
                    activeSpeaker === 'local'
                      ? 'bg-[#087F68] text-white shadow-xs'
                      : 'bg-[#F5F7F7] text-[#62716F]'
                  }`}
                >
                  Local ({currentTargetObj.name})
                </button>
              </div>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto p-1 pr-2">
              {convoHistory.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl text-xs space-y-1 ${
                    item.sender === 'traveler'
                      ? 'bg-[#E6F6EF] border border-teal-200 ml-4 text-emerald-950'
                      : 'bg-[#E3F2FD] border border-sky-200 mr-4 text-sky-950'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold opacity-75">
                    <span>{item.sender === 'traveler' ? `You (Tourist - ${currentSourceObj.name})` : `Local Resident (${currentTargetObj.name})`}</span>
                    <button
                      onClick={() => speechSynthesisService.speak(item.translatedText, item.toLang)}
                      className="hover:underline flex items-center gap-1 font-bold text-[#087F68]"
                    >
                      <Volume2 className="w-3 h-3" />
                      Listen Native
                    </button>
                  </div>
                  <div className="font-medium text-slate-700">{item.originalText}</div>
                  <div className="font-bold text-xs pt-1 border-t border-black/10 text-slate-900">
                    {item.translatedText}
                  </div>
                  {item.pronunciation && (
                    <div className="text-[10px] text-slate-500 italic">
                      {item.pronunciation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={convoInput}
                onChange={(e) => setConvoInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendConvo()}
                placeholder={activeSpeaker === 'traveler' ? `Type in ${currentSourceObj.name}...` : `Type in ${currentTargetObj.name}...`}
                className="flex-1 bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#087F68]"
              />
              <button
                onClick={handleSendConvo}
                className="p-2 bg-[#087F68] hover:bg-[#075B4E] text-white rounded-xl transition-colors"
                title="Send and translate"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Phrasebook: translates cleanly into target language */}
      <div className="bg-white rounded-3xl border border-[#E2E8E6] p-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-[#172B2A]">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#087F68]" />
            Essential Phrases (Translates to {currentTargetObj.name})
          </span>
          <span className="text-[10px] text-[#087F68]">Tap to Translate & Speak</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'meter', label: 'Please run by the meter', icon: Car },
            { key: 'how_much', label: 'How much does this cost?', icon: ShoppingBag },
            { key: 'nearest_metro', label: 'Where is the metro station?', icon: Compass },
            { key: 'help', label: 'I need help, please', icon: HelpCircle },
            { key: 'hospital', label: 'Where is the hospital?', icon: AlertTriangle },
            { key: 'water', label: 'Sealed water bottle, please', icon: Coffee },
            { key: 'not_spicy', label: 'Please make it non-spicy', icon: Sparkles },
            { key: 'discount', label: 'Can you give a little discount?', icon: ShoppingBag },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={async () => {
                  setInputText(item.label);
                  await handleTranslate(item.label, sourceLang, targetLang);
                }}
                className="p-2.5 rounded-2xl bg-[#F5F7F7] hover:bg-[#E6F6EF] border border-[#E2E8E6] text-left text-[11px] font-medium text-[#172B2A] hover:text-[#087F68] transition-colors flex items-center gap-2 group"
              >
                <Icon className="w-3.5 h-3.5 text-[#087F68] shrink-0 group-hover:scale-105 transition-transform" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
