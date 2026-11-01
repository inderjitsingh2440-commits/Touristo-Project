"""
Translation Service & Phrasebook for Touristo
"""
from typing import Dict

PHRASEBOOK: Dict[str, str] = {
    'how much is this': 'यह कितने का है? (Yeh kitne ka hai?)',
    'where is the nearest metro station': 'नजदीकी मेट्रो स्टेशन कहाँ है? (Najdiki metro station kahan hai?)',
    'please run by meter': 'कृपया मीटर से चलें (Kripya meter se chalien)',
    'i need help': 'मुझे मदद चाहिए (Mujhe madad chahiye)',
    'where is the hospital': 'अस्पताल कहाँ है? (Aspataal kahan hai?)',
    'no spicy please': 'कृपया तीखा मत बनाइए (Kripya teekha mat banaiye)',
    'thank you': 'धन्यवाद (Dhanyavaad)',
}

class TranslationService:
    @staticmethod
    def translate(text: str, source_lang: str = 'en', target_lang: str = 'hi') -> str:
        clean = text.lower().strip().rstrip('?.,!')
        if clean in PHRASEBOOK:
            return PHRASEBOOK[clean]
        
        if source_lang == 'en' and target_lang == 'hi':
            return f"{text} [अनुवाद: नमस्ते, यह सुरक्षित यात्रा के लिए महत्वपूर्ण है।]"
        return f"{text} [Translated to English]"
