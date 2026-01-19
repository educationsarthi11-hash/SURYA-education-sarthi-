
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { BuildingOfficeIcon, CheckCircleIcon, EduSarthiLogo, SparklesIcon } from '../icons/AllIcons';
import { useAppConfig } from '../../contexts/AppConfigContext';

interface FranchiseHeroProps {
    onNavigateToLogin: () => void;
}

const FranchiseHero: React.FC<FranchiseHeroProps> = ({ onNavigateToLogin }) => {
    const { t, selectedCountry } = useLanguage();
    const { logoUrl, institutionName } = useAppConfig();

    const benefits = [
        { en: "Global White-label Branding", hi: "ग्लोबल व्हाइट-लेबल ब्रांडिंग" },
        { en: "Local Language AI Tutor", hi: "क्षेत्रीय भाषा AI ट्यूटर (Haryanvi/Punjabi)" },
        { en: "International Student CRM", hi: "इंटरनेशनल स्टूडेंट CRM" },
        { en: "Currency & Region Sync", hi: "करेंसी और क्षेत्र सिंक" },
        { en: "AI Auto-Calling (Recovery)", hi: "AI ऑटो-कॉलिंग (फीस रिकवरी)" },
        { en: "Worldwide Cloud Infrastructure", hi: "वर्ल्डवाइड क्लाउड इंफ्रास्ट्रक्चर" }
    ];

    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="animate-fade-in-up order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-orange-500/30">
                            Global Franchise Partnership
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1] mb-8">
                            अपनी <span className="text-orange-500">AI फ्रेंचाइजी</span> <br/>
                            पूरी दुनिया में फैलाएं
                        </h2>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed font-hindi">
                            {selectedCountry.name} में अपना डिजिटल संस्थान शुरू करें। हम आपको वो तकनीक देते हैं जो आपकी भाषा और आपके लोगों की जरूरतों को समझती है।
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10 mb-12">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="bg-green-50/20 p-1 rounded-lg">
                                        <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-100 font-hindi tracking-wide">{benefit.hi}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-5">
                            <button 
                                onClick={onNavigateToLogin}
                                className="px-10 py-5 bg-primary text-white font-black rounded-2xl transition-all shadow-2xl hover:bg-blue-700 flex items-center gap-4 transform hover:scale-105 active:scale-95"
                            >
                                <BuildingOfficeIcon className="h-6 w-6" />
                                <span className="uppercase tracking-widest">अभी आवेदन करें</span>
                            </button>
                        </div>
                    </div>

                    <div className="relative order-1 lg:order-2">
                        {/* Interactive Branding Box */}
                        <div className="w-full aspect-square bg-white/5 rounded-[4rem] border-2 border-white/10 flex items-center justify-center overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50"></div>
                            
                            <div className="flex flex-col items-center justify-center p-12 text-center animate-pop-in">
                                {/* Display Uploaded Logo or Default Sarthi Logo */}
                                <div className="w-64 h-64 flex items-center justify-center mb-8 relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse"></div>
                                    {logoUrl ? (
                                        <img src={logoUrl} className="max-w-full max-h-full object-contain drop-shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-transform duration-700 group-hover:scale-110" alt={institutionName} />
                                    ) : (
                                        <EduSarthiLogo className="w-full h-auto drop-shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-transform duration-700 group-hover:scale-110" />
                                    )}
                                </div>

                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter relative z-10">
                                    {institutionName} <br/> 
                                    <span className="text-primary">Global HQ</span>
                                </h3>
                                <p className="text-slate-400 mt-4 text-sm font-hindi uppercase font-bold tracking-widest relative z-10">
                                    {selectedCountry.name} का अपना स्मार्ट हब
                                </p>

                                <div className="mt-8 flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                                    <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Active Partner</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FranchiseHero;
