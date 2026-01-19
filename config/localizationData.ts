
export interface Language {
    code: string;
    name: string;
    nativeName: string;
    isRegional?: boolean;
}

export interface Country {
    code: string;
    name: string;
    flag: string;
    languages: Language[];
}

export const COUNTRIES: Country[] = [
    {
        code: 'IN',
        name: 'India',
        flag: '🇮🇳',
        languages: [
            { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
            { code: 'en-IN', name: 'English', nativeName: 'English' },
            { code: 'hr', name: 'Haryanvi', nativeName: 'हरियाणवी', isRegional: true },
        ]
    },
    {
        code: 'US',
        name: 'United States',
        flag: '🇺🇸',
        languages: [
            { code: 'en-US', name: 'English', nativeName: 'English' },
            { code: 'es', name: 'Spanish', nativeName: 'Español' },
        ]
    },
    {
        code: 'GB',
        name: 'United Kingdom',
        flag: '🇬🇧',
        languages: [{ code: 'en-GB', name: 'English', nativeName: 'English' }]
    },
    {
        code: 'AE',
        name: 'UAE',
        flag: '🇦🇪',
        languages: [{ code: 'ar', name: 'Arabic', nativeName: 'العربية' }]
    },
    {
        code: 'CA',
        name: 'Canada',
        flag: '🇨🇦',
        languages: [
            { code: 'en-CA', name: 'English', nativeName: 'English' },
            { code: 'fr-CA', name: 'French', nativeName: 'Français' }
        ]
    },
    {
        code: 'AU',
        name: 'Australia',
        flag: '🇦🇺',
        languages: [{ code: 'en-AU', name: 'English', nativeName: 'English' }]
    },
    {
        code: 'DE',
        name: 'Germany',
        flag: '🇩🇪',
        languages: [{ code: 'de', name: 'German', nativeName: 'Deutsch' }]
    },
    {
        code: 'FR',
        name: 'France',
        flag: '🇫🇷',
        languages: [{ code: 'fr', name: 'French', nativeName: 'Français' }]
    },
    {
        code: 'JP',
        name: 'Japan',
        flag: '🇯🇵',
        languages: [{ code: 'ja', name: 'Japanese', nativeName: '日本語' }]
    },
    {
        code: 'CN',
        name: 'China',
        flag: '🇨🇳',
        languages: [{ code: 'zh', name: 'Chinese', nativeName: '中文' }]
    },
    {
        code: 'RU',
        name: 'Russia',
        flag: '🇷🇺',
        languages: [{ code: 'ru', name: 'Russian', nativeName: 'Русский' }]
    },
    {
        code: 'BR',
        name: 'Brazil',
        flag: '🇧🇷',
        languages: [{ code: 'pt', name: 'Portuguese', nativeName: 'Português' }]
    },
    {
        code: 'SG',
        name: 'Singapore',
        flag: '🇸🇬',
        languages: [
            { code: 'en-SG', name: 'English', nativeName: 'English' },
            { code: 'zh-SG', name: 'Mandarin', nativeName: '华语' }
        ]
    },
    {
        code: 'GLOBAL',
        name: 'International / Other',
        flag: '🌐',
        languages: [{ code: 'en', name: 'English', nativeName: 'Global English' }]
    }
];

export const TRANSLATIONS: any = {
    'hi': {
        'hero_title': 'दुनिया का पहला AI सार्थी हब',
        'hero_subtitle': 'शिक्षा की नई क्रांति। सीधा एडमिशन और स्मार्ट लर्निंग।',
        'cta_dashboard': 'पोर्टल लॉगिन',
        'Direct AI Admission': 'सीधा AI दाखिला',
        'Logout': 'लॉग आउट',
        'Select Country': 'देश चुनें',
        'Select Language': 'भाषा चुनें'
    },
    'ar': {
        'hero_title': 'أول مركز تعليمي يعمل بالذكاء الاصطनाعي',
        'hero_subtitle': 'التعليم بلا حدود. الدخول المباشر والتعلم الذكي.',
        'cta_dashboard': 'تسجيل الدخول',
        'Logout': 'تسجيل الخروج'
    },
    'en': {
        'hero_title': 'World\'s First AI Sarthi Hub',
        'hero_subtitle': 'Revolutionizing Education. Direct Admission & Smart Learning.',
        'cta_dashboard': 'Login Portal',
        'Logout': 'Logout'
    }
};
