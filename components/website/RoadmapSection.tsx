
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { CalendarDaysIcon, GlobeAltIcon, UsersIcon, SparklesIcon, BuildingOfficeIcon, BoltIcon, RocketLaunchIcon } from '../icons/AllIcons';
import { useLanguage } from '../../contexts/LanguageContext';

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode; color: string; isHindi: boolean }> = ({ title, description, icon, color, isHindi }) => (
    <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${color} bg-opacity-10 text-white group-hover:scale-110 transition-transform shadow-inner`}>
            {React.cloneElement(icon as React.ReactElement<any>, { className: `h-8 w-8 ${color.replace('bg-', 'text-')}` })}
        </div>
        <h3 className={`text-2xl font-black text-slate-900 mb-4 tracking-tight ${isHindi ? 'font-hindi' : ''}`}>{title}</h3>
        <p className={`text-sm text-slate-500 leading-relaxed font-medium ${isHindi ? 'font-hindi' : ''}`}>{description}</p>
    </div>
);

const RoadmapSection: React.FC = () => {
    const { t, language } = useLanguage();
    const isHindi = language !== 'en';

    return (
        <SectionWrapper id="roadmap" className="bg-white relative overflow-hidden py-32">
            <div className="text-center max-w-4xl mx-auto mb-20 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-widest mb-6">
                    <RocketLaunchIcon className="h-4 w-4" /> Future Horizon 2025
                </div>
                <h2 className={`text-4xl sm:text-6xl font-black text-slate-950 tracking-tight mb-8 ${isHindi ? 'font-hindi' : ''}`}>
                    {t('roadmap_title', 'शिक्षा का भविष्य')}
                </h2>
                <p className={`mt-4 text-xl text-slate-500 font-hindi font-medium leading-relaxed ${isHindi ? 'font-hindi' : ''}`}>
                    {t('roadmap_subtitle', 'मंगमत के इस इकोसिस्टम को हम विश्वस्तरीय बनाने के लिए इन तकनीकों पर काम कर रहे हैं।')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                <FeatureCard
                    title={t("Metaverse Class", "Metaverse Classrooms")}
                    description={t("Virtual reality based learning environments.", "पूरी क्लास एक 3D वर्चुअल दुनिया में बैठकर पढ़ सकेगी।")}
                    icon={<SparklesIcon />}
                    color="bg-indigo-500"
                    isHindi={isHindi}
                />
                <FeatureCard
                    title={t("VR Tours", "VR Campus Tours")}
                    description={t("360 degree virtual tours for parents.", "नए छात्रों और अभिभावकों के लिए स्कूल का 360-डिग्री वर्चुअल टूर।")}
                    icon={<GlobeAltIcon />}
                    color="bg-purple-500"
                    isHindi={isHindi}
                />
                <FeatureCard
                    title={t("Proctoring 2.0", "AI Proctoring 2.0")}
                    description={t("Advanced eye tracking for transparent exams.", "परीक्षा के दौरान छात्र की हलचल को ट्रैक करके शत-प्रतिशत पारदर्शिता।")}
                    icon={<BuildingOfficeIcon />}
                    color="bg-red-500"
                    isHindi={isHindi}
                />
                <FeatureCard
                    title={t("Smart Campus", "IoT Smart Campus")}
                    description={t("Automated lighting, bells and security.", "स्मार्ट बेल, ऑटोमैटिक लाइट और बायोमेट्रिक गेट्स का एकीकरण।")}
                    icon={<BoltIcon />}
                    color="bg-orange-500"
                    isHindi={isHindi}
                />
                <FeatureCard
                    title={t("Paperless", "Paperless Admissions")}
                    description={t("Face scan based 10-second admissions.", "फेस स्कैन और फिंगरप्रिंट से 10 सेकंड में डिजिटल एडमिशन।")}
                    icon={<UsersIcon />}
                    color="bg-green-500"
                    isHindi={isHindi}
                />
                <FeatureCard
                    title={t("AI PTM", "AI PTM Scheduler")}
                    description={t("Smart meeting booking for busy parents.", "अभिभावकों की सुविधा के अनुसार मीटिंग का समय बुक करने वाला स्मार्ट कैलेंडर।")}
                    icon={<CalendarDaysIcon />}
                    color="bg-blue-500"
                    isHindi={isHindi}
                />
            </div>
            
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[120px]"></div>
            </div>
        </SectionWrapper>
    );
};

export default RoadmapSection;
