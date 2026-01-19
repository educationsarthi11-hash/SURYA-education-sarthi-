
import React from 'react';
import { 
    HeartIcon, SparklesIcon, GlobeAltIcon, VideoCameraIcon, 
    UserPlusIcon, AcademicCapIcon, CalculatorIcon, PhoneIcon,
    ShoppingCartIcon, CameraIcon, ShieldCheckIcon
} from '../icons/AllIcons';
import SectionWrapper from './SectionWrapper';
import { useLanguage } from '../../contexts/LanguageContext';

const BentoCard: React.FC<{ 
    title: string; 
    description: string; 
    icon: React.ReactNode; 
    className?: string;
    color: string;
    delay: number;
    isHindi: boolean;
}> = ({ title, description, icon, className, color, delay, isHindi }) => (
    <div 
        className={`relative overflow-hidden bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-${color}-200 transition-all duration-500 group ${className}`}
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
        <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-${color}-100 text-${color}-600 group-hover:rotate-6 transition-transform shadow-inner`}>
            {icon}
        </div>
        <h3 className={`relative z-10 text-2xl font-black text-slate-900 mb-3 group-hover:text-primary transition-colors ${isHindi ? 'font-hindi' : ''}`}>{title}</h3>
        <p className={`relative z-10 text-slate-500 text-sm leading-relaxed font-medium ${isHindi ? 'font-hindi' : ''}`}>{description}</p>
    </div>
);

const FeaturesSection: React.FC = () => {
    const { t, language, selectedLanguage } = useLanguage();
    const isHindi = language === 'hi' || language === 'hr' || language === 'pa';

    return (
        <SectionWrapper id="features" className="bg-slate-50/50 py-32">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    <SparklesIcon className="h-4 w-4" /> Comprehensive AI Ecosystem
                </div>
                <h2 className={`text-4xl sm:text-5xl font-black text-slate-950 mt-2 tracking-tight ${isHindi ? 'font-hindi' : ''}`}>
                    {t('Why Choose Sarthi Mangmat?', 'मंगमत सार्थी ही क्यों चुनें?')}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <BentoCard 
                    title={t("AI Global Bazaar", "AI ग्लोबल बाज़ार (Incubator)")}
                    description={t("Convert student projects into commercial products with AI marketing and valuation.", "छात्रों के प्रोजेक्ट्स को बिज़नेस में बदलें। AI मार्केटिंग और कीमत तय करने में मदद करेगा।")}
                    icon={<ShoppingCartIcon className="h-7 w-7"/>}
                    color="indigo"
                    className="md:col-span-2"
                    delay={0}
                    isHindi={isHindi}
                />
                <BentoCard 
                    title={t("Smart Face Attendance", "स्मार्ट हाजिरी सिस्टम")}
                    description={t("AI recognition with QR and Manual fallbacks. Instant parent alerts.", "AI चेहरा पहचान सिस्टम। फ़ेल होने पर QR और मैन्युअल विकल्प। अभिभावकों को तुरंत सूचना।")}
                    icon={<CameraIcon className="h-7 w-7"/>}
                    color="green"
                    delay={100}
                    isHindi={isHindi}
                />
                <BentoCard 
                    title={t("Aadhaar Admission", "AI स्मार्ट एडमिशन")}
                    description={t("Scan Aadhaar to auto-fill forms instantly.", "आधार स्कैन करके फॉर्म भरें और तुरंत डिजिटल आईडी कार्ड प्राप्त करें।")}
                    icon={<UserPlusIcon className="h-7 w-7"/>}
                    color="orange"
                    delay={200}
                    isHindi={isHindi}
                />
                <BentoCard 
                    title={t("AI Video Generator", "AI वीडियो जेनरेटर")}
                    description={t("Generate high-quality video lessons using Google Veo.", "गूगल Veo का उपयोग करके मिनटों में शानदार शैक्षिक वीडियो बनाएं।")}
                    icon={<VideoCameraIcon className="h-7 w-7"/>}
                    color="red"
                    className="md:col-span-2"
                    delay={300}
                    isHindi={isHindi}
                />
            </div>

            {/* Safety & Trust Section */}
            <div className="mt-40 bg-white p-12 sm:p-20 rounded-[4rem] shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 bg-pink-50 rounded-full blur-[100px] -mr-20 -mt-20"></div>
                
                <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                        <ShieldCheckIcon className="h-4 w-4" /> 100% Secure & Local
                    </div>
                    <h2 className={`text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter ${isHindi ? 'font-hindi' : ''}`}>
                        {selectedLanguage.code === 'hr' ? 'भरोसेमंद सार्थी' : 'सुरक्षित और स्थानीय'}
                    </h2>
                    <p className="text-slate-500 mt-6 text-xl font-hindi font-medium leading-relaxed">
                        हमारा AI आपकी भाषा (Haryanvi/Punjabi/Hindi) और आपके डेटा की सुरक्षा समझता है।
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {[
                        { 
                            title: t("Vidya Setu", "विद्या सेतु (Voice Report)"), 
                            desc: t("Parents can listen to daily progress and homework on phone.", "अभिभावक फोन पर एक बटन दबाकर अपनी भाषा में रिपोर्ट सुन सकते हैं।"),
                            icon: <PhoneIcon />,
                            color: "orange"
                        },
                        { 
                            title: t("Safe Transport", "सुरक्षित परिवहन (Live GPS)"), 
                            desc: t("Live bus tracking and driver details with SOS alerts.", "बस की लाइव लोकेशन और ड्राइवर का विवरण फोन पर। SOS अलर्ट की सुविधा।"),
                            icon: <GlobeAltIcon />,
                            color: "blue"
                        },
                        { 
                            title: t("Transparent Fees", "पारदर्शी फीस (Gullak)"), 
                            desc: t("Full fee breakdown and digital receipts with AI reminders.", "फीस का पूरा हिसाब-किताब और डिजिटल रसीदें। AI रिमाइंडर की सुविधा।"),
                            icon: <CalculatorIcon />,
                            color: "green"
                        },
                        { 
                            title: t("AI Safety Guard", "AI सुरक्षा गार्ड"), 
                            desc: t("Automated MLM/Spam filter to protect students.", "नेटवर्क मार्केटिंग और फ्रॉड विज्ञापनों को रोकने के लिए स्मार्ट फिल्टर।"),
                            icon: <ShieldCheckIcon />,
                            color: "purple"
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-slate-50/50 p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-${item.color}-100 text-${item.color}-600 group-hover:scale-110 transition-transform shadow-inner`}>
                                {React.cloneElement(item.icon as React.ReactElement<any>, { className: "h-8 w-8" })}
                            </div>
                            <h4 className="text-xl font-black text-slate-900 mb-4 font-hindi leading-tight">{item.title}</h4>
                            <p className="text-slate-500 text-sm font-hindi font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default FeaturesSection;
