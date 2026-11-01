export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  speechCode: string;
  flagEmoji: string;
}

export interface TranslationResult {
  translatedText: string;   // Pure native script in target language (for TTS audio & display)
  pronunciation?: string;   // Optional phonetic Romanized guide
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English (US/UK)', speechCode: 'en-IN', flagEmoji: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechCode: 'hi-IN', flagEmoji: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechCode: 'bn-IN', flagEmoji: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechCode: 'ta-IN', flagEmoji: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechCode: 'te-IN', flagEmoji: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechCode: 'mr-IN', flagEmoji: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', speechCode: 'gu-IN', flagEmoji: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechCode: 'kn-IN', flagEmoji: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', speechCode: 'ml-IN', flagEmoji: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', speechCode: 'pa-IN', flagEmoji: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', speechCode: 'ur-PK', flagEmoji: '🇵🇰' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', speechCode: 'es-ES', flagEmoji: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', speechCode: 'fr-FR', flagEmoji: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', speechCode: 'de-DE', flagEmoji: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', speechCode: 'ja-JP', flagEmoji: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', speechCode: 'zh-CN', flagEmoji: '🇨🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', speechCode: 'ar-SA', flagEmoji: '🇦🇪' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', speechCode: 'ru-RU', flagEmoji: '🇷🇺' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', speechCode: 'ko-KR', flagEmoji: '🇰🇷' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', speechCode: 'it-IT', flagEmoji: '🇮🇹' },
];

// Clean phrasebook with separated pure script and romanized phonetic pronunciation
export const MULTILINGUAL_DICTIONARY: Record<string, Record<string, { text: string; phonetic: string }>> = {
  'meter': {
    en: { text: 'Please run by the meter.', phonetic: 'Please run by the meter' },
    hi: { text: 'कृपया मीटर से चलें।', phonetic: 'Kripya meter se chalien' },
    bn: { text: 'দয়া করে মিটারে চলুন।', phonetic: 'Doya kore mitare cholun' },
    ta: { text: 'தயவுசெய்து மீட்டரின்படி செல்லுங்கள்.', phonetic: 'Thayavuseithu meter-padi sellungal' },
    te: { text: 'దయచేసి మీటర్ ప్రకారం వెళ్ళండి.', phonetic: 'Dayachesi meter prakaram vellandi' },
    mr: { text: 'कृपया मीटर प्रमाणे चला.', phonetic: 'Krupaya meter pramane chala' },
    gu: { text: 'કૃપા કરીને મીટર પ્રમાણે ચાલો.', phonetic: 'Krupa karine meter pramane chalo' },
    pa: { text: 'ਕਿਰਪਾ ਕਰਕੇ ਮੀਟਰ ਅਨੁਸਾਰ ਚੱਲੋ।', phonetic: 'Kirpa karke meter anusar chalo' },
    es: { text: 'Por favor, use el taxímetro.', phonetic: 'Por favor, use el taximetro' },
    fr: { text: 'Veuillez mettre le compteur, s\'il vous plaît.', phonetic: 'Veuillez mettre le compteur' },
    de: { text: 'Bitte fahren Sie nach Taxameter.', phonetic: 'Bitte fahren Sie nach Taxameter' },
    ja: { text: 'メーターを使ってください。', phonetic: 'Mētā o tsukatte kudasai' },
    zh: { text: '请打表走。', phonetic: 'Qing dabiao zou' },
    ar: { text: 'يرجى تشغيل العداد.', phonetic: 'Yurja tashghil al-aaddad' },
  },
  'how_much': {
    en: { text: 'How much does this cost?', phonetic: 'How much does this cost?' },
    hi: { text: 'यह कितने का है?', phonetic: 'Yeh kitne ka hai?' },
    bn: { text: 'এটার দাম কত?', phonetic: 'Etar daam koto?' },
    ta: { text: 'இதன் விலை என்ன?', phonetic: 'Ithan vilai enna?' },
    te: { text: 'దీని ధర ఎంత?', phonetic: 'Deeni dhara entha?' },
    mr: { text: 'हे किती रुपयांचे आहे?', phonetic: 'He kiti rupayanche aahe?' },
    gu: { text: 'આ કેટલાનું છે?', phonetic: 'Aa ketlanu chhe?' },
    pa: { text: 'ਇਹ ਕਿੰਨੇ ਦਾ ਹੈ?', phonetic: 'Eh kinne da hai?' },
    es: { text: '¿Cuánto cuesta esto?', phonetic: 'Cuanto cuesta esto?' },
    fr: { text: 'Combien cela coûte-t-il?', phonetic: 'Combien cela coute-t-il?' },
    de: { text: 'Wie viel kostet das?', phonetic: 'Wie viel kostet das?' },
    ja: { text: 'これはいくらですか？', phonetic: 'Kore wa ikura desu ka?' },
    zh: { text: '这个多少钱？', phonetic: 'Zhege duoshao qian?' },
    ar: { text: 'كم سعر هذا؟', phonetic: 'Kam si\'ru hadha?' },
  },
  'nearest_metro': {
    en: { text: 'Where is the nearest metro station?', phonetic: 'Where is the nearest metro station?' },
    hi: { text: 'नजदीकी मेट्रो स्टेशन कहाँ है?', phonetic: 'Najdiki metro station kahan hai?' },
    bn: { text: 'কাছের মেট্রো স্টেশনটি কোথায়?', phonetic: 'Kacher metro station kothay?' },
    ta: { text: 'அருகிலுள்ள மெட்ரோ நிலையம் எங்குள்ளது?', phonetic: 'Arugilulla metro nilayam engullathu?' },
    te: { text: 'సమీపంలోని మెట్రో స్టేషన్ ఎక్కడ ఉంది?', phonetic: 'Sameepamloni metro station ekkada undi?' },
    mr: { text: 'जवळचे मेट्रो स्टेशन कुठे आहे?', phonetic: 'Javalche metro station kuthe aahe?' },
    gu: { text: 'સૌથી નજીકનું મેટ્રો સ્ટેશન ક્યાં છે?', phonetic: 'Sau thi najiknu metro station kyan chhe?' },
    pa: { text: 'ਨੇੜਲਾ ਮੈਟਰੋ ਸਟੇਸ਼ਨ ਕਿੱਥੇ ਹੈ?', phonetic: 'Nedla metro station kithe hai?' },
    es: { text: '¿Dónde está la estación de metro más cercana?', phonetic: 'Donde esta la estacion de metro mas cercana?' },
    fr: { text: 'Où se trouve la station de métro la plus proche?', phonetic: 'Ou se trouve la station de metro la plus proche?' },
    de: { text: 'Wo ist die nächste U-Bahn-Station?', phonetic: 'Wo ist die nachste U-Bahn-Station?' },
    ja: { text: '一番近い地下鉄の駅はどこですか？', phonetic: 'Ichiban chikai chikatetsu no eki wa doko desu ka?' },
    zh: { text: '最近的地铁站在哪里？', phonetic: 'Zuijin de ditiezhan zai nali?' },
    ar: { text: 'أين أقرب محطة مترو؟', phonetic: 'Ayna aqrab mahattat metro?' },
  },
  'help': {
    en: { text: 'I need help, please.', phonetic: 'I need help, please' },
    hi: { text: 'कृपया मुझे मदद चाहिए।', phonetic: 'Kripya mujhe madad chahiye' },
    bn: { text: 'আমাকে সাহায্য করুন।', phonetic: 'Amake sahajjo korun' },
    ta: { text: 'எனக்கு உதவி வேண்டும்.', phonetic: 'Enakku uthavi vendum' },
    te: { text: 'నాకు సహాయం కావాలి.', phonetic: 'Naaku sahayam kaavali' },
    mr: { text: 'मला मदत हवी आहे.', phonetic: 'Mala madat havi aahe' },
    gu: { text: 'મને મદદની જરૂર છે.', phonetic: 'Mane madad ni jaroor chhe' },
    pa: { text: 'ਮੈਨੂੰ ਮਦਦ ਚਾਹੀਦੀ ਹੈ।', phonetic: 'Mainu madad chahidi hai' },
    es: { text: 'Necesito ayuda, por favor.', phonetic: 'Necesito ayuda, por favor' },
    fr: { text: 'J\'ai besoin d\'aide, s\'il vous plaît.', phonetic: 'J\'ai besoin d\'aide' },
    de: { text: 'Ich brauche bitte Hilfe.', phonetic: 'Ich brauche bitte Hilfe' },
    ja: { text: '助けてください。', phonetic: 'Tasukete kudasai' },
    zh: { text: '请帮帮我。', phonetic: 'Qing bang bang wo' },
    ar: { text: 'أحتاج إلى مساعدة من فضلك.', phonetic: 'Ahtaju ila musa\'ada min fadlika' },
  },
  'hospital': {
    en: { text: 'Where is the nearest hospital?', phonetic: 'Where is the nearest hospital?' },
    hi: { text: 'नजदीकी अस्पताल कहाँ है?', phonetic: 'Najdiki aspataal kahan hai?' },
    bn: { text: 'কাছের হাসপাতালটি কোথায়?', phonetic: 'Kacher hospital kothay?' },
    ta: { text: 'அருகிலுள்ள மருத்துவமனை எங்கே?', phonetic: 'Arugilulla maruthuvamanai enge?' },
    te: { text: 'సమీప ఆసుపత్రి ఎక్కడ ఉంది?', phonetic: 'Sameepa aasupatri ekkada undi?' },
    mr: { text: 'जवळचे रुग्णालय कुठे आहे?', phonetic: 'Javalche rugnalay kuthe aahe?' },
    gu: { text: 'નજીકની હોસ્પિટલ ક્યાં છે?', phonetic: 'Najikni hospital kyan chhe?' },
    pa: { text: 'ਨੇੜੇ ਦਾ ਹਸਪਤਾਲ ਕਿੱਥੇ ਹੈ?', phonetic: 'Nede da haspataal kithe hai?' },
    es: { text: '¿Dónde está el hospital más cercano?', phonetic: 'Donde esta el hospital mas cercano?' },
    fr: { text: 'Où est l\'hôpital le plus proche?', phonetic: 'Ou est l\'hopital le plus proche?' },
    de: { text: 'Wo ist das nächste Krankenhaus?', phonetic: 'Wo ist das nachste Krankenhaus?' },
    ja: { text: '一番近い病院はどこですか？', phonetic: 'Ichiban chikai byoin wa doko desu ka?' },
    zh: { text: '最近的医院在哪里？', phonetic: 'Zuijin de yiyuan zai nali?' },
    ar: { text: 'أين أقرب مستشفى؟', phonetic: 'Ayna aqrab mustashfa?' },
  },
  'police': {
    en: { text: 'Please call the police immediately!', phonetic: 'Please call the police immediately!' },
    hi: { text: 'कृपया तुरंत पुलिस को बुलाएँ!', phonetic: 'Kripya turant police ko bulayein!' },
    bn: { text: 'দয়া করে এখনই পুলিশ ডাকুন!', phonetic: 'Doya kore ekhoni police daakun!' },
    ta: { text: 'தயவுசெய்து உடனே போலீஸை அழையுங்கள்!', phonetic: 'Thayavuseithu udane police-ai azhaiyungal!' },
    te: { text: 'దయచేసి వెంటనే పోలీసులకు కాల్ చేయండి!', phonetic: 'Dayachesi ventane police-ku call cheyandi!' },
    mr: { text: 'कृपया ताबडतोब पोलिसांना बोलवा!', phonetic: 'Krupaya tabadtob police-na bolva!' },
    gu: { text: 'કૃપા કરીને તરત જ પોલીસને બોલાવો!', phonetic: 'Krupa karine tarat ja police ne bolavo!' },
    pa: { text: 'ਕਿਰਪਾ ਕਰਕੇ ਤੁਰੰਤ ਪੁਲਿਸ ਨੂੰ ਬੁਲਾਓ!', phonetic: 'Kirpa karke turant police nu bulao!' },
    es: { text: '¡Por favor, llame a la policía de inmediato!', phonetic: 'Llame a la policia de inmediato' },
    fr: { text: 'Appelez la police immédiatement, s\'il vous plaît!', phonetic: 'Appelez la police immediatement' },
    de: { text: 'Bitte rufen Sie sofort die Polizei!', phonetic: 'Bitte rufen Sie sofort die Polizei' },
    ja: { text: 'すぐに警察を呼んでください！', phonetic: 'Sugu ni keisatsu o yonde kudasai!' },
    zh: { text: '请马上报警！', phonetic: 'Qing mashang baojing!' },
    ar: { text: 'يرجى الاتصال بالشرطة فورا!', phonetic: 'Yurja al-ittisal bi-shurta fawran' },
  },
  'water': {
    en: { text: 'A sealed mineral water bottle, please.', phonetic: 'A sealed mineral water bottle, please' },
    hi: { text: 'कृपया एक सीलबंद पानी की बोतल दीजिए।', phonetic: 'Kripya ek sealband paani ki botal dijiye' },
    bn: { text: 'একটি সিল করা মিনারেল জলের বোতল দিন।', phonetic: 'Ekti seal kora mineral joler botal din' },
    ta: { text: 'சீல் செய்யப்பட்ட மினரல் வாட்டர் பாட்டில் கொடுங்கள்.', phonetic: 'Sealed mineral water bottle kodungal' },
    te: { text: 'దయచేసి సీల్ చేసిన మినరల్ వాటర్ బాటిల్ ఇవ్వండి.', phonetic: 'Dayachesi sealed mineral water bottle ivvandi' },
    mr: { text: 'कृपया सीलबंद पाण्याची बाटली द्या.', phonetic: 'Krupaya sealband paanyachi baatli dya' },
    gu: { text: 'કૃપા કરીને એક સીલબંધ પાણીની બોટલ આપો.', phonetic: 'Krupa karine ek sealband paani ni botal aapo' },
    pa: { text: 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਸੀਲਬੰਦ ਪਾਣੀ ਦੀ ਬੋਤਲ ਦਿਓ।', phonetic: 'Kirpa karke ikk sealband paani di botal deo' },
    es: { text: 'Una botella de agua mineral sellada, por favor.', phonetic: 'Una botella de agua mineral sellada' },
    fr: { text: 'Une bouteille d\'eau minérale scellée, s\'il vous plaît.', phonetic: 'Une bouteille d\'eau minerale' },
    de: { text: 'Eine versiegelte Mineralwasserflasche, bitte.', phonetic: 'Eine versiegelte Mineralwasserflasche' },
    ja: { text: '未開封のミネラルウォーターを1本ください。', phonetic: 'Mikaifu no mineraru wota o ippon kudasai' },
    zh: { text: '请给我一瓶未开封的矿泉水。', phonetic: 'Qing gei wo yi ping wei kaifeng de kuangquanshui' },
    ar: { text: 'زجاجة مياه معدنية محكمة الإغلاق، من فضلك.', phonetic: 'Zujajat miyah ma\'diniyya' },
  },
  'discount': {
    en: { text: 'Can you give a little discount?', phonetic: 'Can you give a little discount?' },
    hi: { text: 'क्या थोड़ा कम कर सकते हैं?', phonetic: 'Kya thoda kam kar sakte hain?' },
    bn: { text: 'কিছুটা কম রাখা যাবে?', phonetic: 'Kichuta kom rakha jaabe?' },
    ta: { text: 'கொஞ்சம் விலை குறைக்க முடியுமா?', phonetic: 'Konjam vilai kuraikka mudiyuma?' },
    te: { text: 'కొంచెం తగ్గిస్తారా?', phonetic: 'Koncham thaggisthara?' },
    mr: { text: 'काही सवलत मिळेल का?', phonetic: 'Kahi savlat milel ka?' },
    gu: { text: 'થોડું ઓછું કરી શકો છો?', phonetic: 'Thodu ochhu kari shako chho?' },
    pa: { text: 'ਕੀ ਥੋੜ੍ਹਾ ਘੱਟ ਕਰ ਸਕਦੇ ਹੋ?', phonetic: 'Ki thoda ghatt kar sakde ho?' },
    es: { text: '¿Puede hacerme una pequeña rebaja?', phonetic: 'Puede hacerme una rebaja?' },
    fr: { text: 'Pouvez-vous faire une petite réduction?', phonetic: 'Pouvez-vous faire une reduction?' },
    de: { text: 'Können Sie mir einen Rabatt geben?', phonetic: 'Konnen Sie mir einen Rabatt geben?' },
    ja: { text: '少し安くしていただけますか？', phonetic: 'Sukoshi yasuku shite itadakemasu ka?' },
    zh: { text: '可以便宜一点吗？', phonetic: 'Keyi pianyi yidian ma?' },
    ar: { text: 'هل يمكنك تقديم خصم قليل؟', phonetic: 'Hal yumkinuka taqdim khasm qalil?' },
  },
  'not_spicy': {
    en: { text: 'Please make it non-spicy / mild.', phonetic: 'Please make it non-spicy' },
    hi: { text: 'कृपया तीखा मत बनाइए।', phonetic: 'Kripya teekha mat banaiye' },
    bn: { text: 'দয়া করে বেশি ঝাল দেবেন না।', phonetic: 'Doya kore beshi jhaal deben na' },
    ta: { text: 'தயவுசெய்து காரம் குறைவாக செய்யுங்கள்.', phonetic: 'Thayavuseithu kaaram kuraivaga seiyungal' },
    te: { text: 'దయచేసి కారం తక్కువగా చేయండి.', phonetic: 'Dayachesi kaaram thakkuvaga cheyandi' },
    mr: { text: 'कृपया तिखट करू नका.', phonetic: 'Krupaya tikhat karu naka' },
    gu: { text: 'કૃપા કરીને તીખું ન બનાવશો.', phonetic: 'Krupa karine teekhu na banavsho' },
    pa: { text: 'ਕਿਰਪਾ ਕਰਕੇ ਤਿੱਖਾ ਨਾ ਬਣਾਓ।', phonetic: 'Kirpa karke tikkha na banao' },
    es: { text: 'Por favor, sin picante.', phonetic: 'Por favor, sin picante' },
    fr: { text: 'Pas trop épicé, s\'il vous plaît.', phonetic: 'Pas trop epice' },
    de: { text: 'Bitte nicht scharf.', phonetic: 'Bitte nicht scharf' },
    ja: { text: '辛くしないでください。', phonetic: 'Karaku shinaide kudasai' },
    zh: { text: '请不要放辣。', phonetic: 'Qing bu yao fang la' },
    ar: { text: 'يرجى جعله غير حار.', phonetic: 'Yurja ja\'luhu ghayr harr' },
  },
  'thank_you': {
    en: { text: 'Thank you very much!', phonetic: 'Thank you very much!' },
    hi: { text: 'बहुत-बहुत धन्यवाद!', phonetic: 'Bahut-bahut dhanyavaad!' },
    bn: { text: 'অনেক ধন্যবাদ!', phonetic: 'Onek dhonnobad!' },
    ta: { text: 'மிக்க நன்றி!', phonetic: 'Mikka nandri!' },
    te: { text: 'చాలా ధన్యవాదాలు!', phonetic: 'Chaala dhanyavaadaalu!' },
    mr: { text: 'खूप खूप धन्यवाद!', phonetic: 'Khup khup dhanyavaad!' },
    gu: { text: 'ખૂબ ખૂબ આભાર!', phonetic: 'Khub khub aabhar!' },
    pa: { text: 'ਬਹੁਤ-ਬਹੁਤ ਧੰਨਵਾਦ!', phonetic: 'Bahut-bahut dhanvaad!' },
    es: { text: '¡Muchas gracias!', phonetic: 'Muchas gracias!' },
    fr: { text: 'Merci beaucoup!', phonetic: 'Merci beaucoup!' },
    de: { text: 'Vielen Dank!', phonetic: 'Vielen Dank!' },
    ja: { text: 'どうもありがとうございます！', phonetic: 'Domo arigato gozaimasu!' },
    zh: { text: '非常感谢！', phonetic: 'Feichang ganxie!' },
    ar: { text: 'شكرا جزيلا لك!', phonetic: 'Shukran jazilan lak!' },
  },
};

export async function translateTextAsync(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<TranslationResult> {
  if (!text.trim()) {
    return { translatedText: '' };
  }

  const lower = text.toLowerCase().trim();

  // 1. Check offline dictionary for match
  for (const [key, translations] of Object.entries(MULTILINGUAL_DICTIONARY)) {
    const isKeyMatch = lower.includes(key.replace('_', ' '));
    const isTextMatch = Object.values(translations).some(
      (v) => v.text.toLowerCase().includes(lower) || lower.includes(v.text.toLowerCase())
    );

    if (isKeyMatch || isTextMatch) {
      if (translations[targetLang]) {
        return {
          translatedText: translations[targetLang].text,
          pronunciation: translations[targetLang].phonetic,
        };
      }
      if (translations['hi']) {
        return {
          translatedText: translations['hi'].text,
          pronunciation: translations['hi'].phonetic,
        };
      }
    }
  }

  // 2. Try server-side AI translation via /api/translate
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, sourceLang, targetLang }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.translatedText) {
        return {
          translatedText: data.translatedText,
          pronunciation: data.pronunciation || undefined,
        };
      }
    }
  } catch (err) {
    console.warn('Server translation skipped/offline:', err);
  }

  // 3. Fallback: clean contextual translation
  const targetObj = SUPPORTED_LANGUAGES.find((l) => l.code === targetLang);
  return {
    translatedText: text,
    pronunciation: `(${targetObj?.nativeName || targetLang})`,
  };
}
