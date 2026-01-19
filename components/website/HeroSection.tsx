
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SparklesIcon, ArrowRightIcon, EduSarthiLogo, UserCircleIcon, BoltIcon, SunIcon, AcademicCapIcon, SignalIcon } from '../icons/AllIcons';
import { useAppConfig } from '../../contexts/AppConfigContext';

interface HeroSectionProps {
    onNavigateToLogin: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToLogin }) => {
    const { t, selectedCountry, selectedLanguage } = useLanguage();
    const { slogan, institutionName, logoUrl } = useAppConfig();

    return (
        <section id="home" className="relative bg-[#0f172a] overflow-hidden min-h-screen flex flex-col justify-center pt-24 pb-20">
            {/* Surya Glow Effect */}
            <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-amber-600/10 rounded-full blur-[180px] -mr-96 -mt-96 animate-pulse-slow"></div>
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px] -ml-48"></div>

            {/* Premium Ticker */}
            <div className="absolute top-24 left-0 w-full bg-white/5 border-y border-white/10 py-4 z-20 overflow-hidden backdrop-blur-md">
                <div className="flex items-center whitespace-nowrap animate-marquee">
                    {[1,2,3,4,5].map(i => (
                        <div key={i} className="flex items-center">
                            <span className="text-primary font-black text-[12px] uppercase tracking-[0.4em] px-12 border-r border-white/10 flex items-center gap-3">
                                <SunIcon className="h-5 w-5 text-primary"/> {institutionName}
                            </span>
                            <p className="text-white text-lg font-black px-12 font-hindi tracking-widest opacity-90 uppercase">
                                {slogan}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl z-10 mt-20 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-7 space-y-12 animate-fade-in-up">
                        <div className="flex flex-wrap gap-4">
                            <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl backdrop-blur-xl">
                                <span className="text-2xl drop-shadow-lg">{selectedCountry.flag}</span>
                                <span>{selectedLanguage.nativeName} {t('Active', 'Active')} • The Digital Sun</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-xl">
                                <SignalIcon className="h-4 w-4 animate-pulse" />
                                <span>128 AI NODES LIVE</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-7xl lg:text-[9.5rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic">
                                SURYA <br/>
                                <span className="text-primary not-italic inline-flex items-center gap-6">
                                    SARTHI <SparklesIcon className="h-16 w-16 lg:h-32 lg:w-32 animate-pulse text-white/10"/>
                                </span>
                            </h1>
                            <div className="h-3 w-64 bg-primary rounded-full shadow-[0_0_40px_rgba(217,119,6,0.8)]"></div>
                        </div>

                        <p className="text-3xl lg:text-5xl text-slate-300 max-w-3xl leading-relaxed font-hindi font-black italic border-l-8 border-primary pl-8 py-6 bg-gradient-to-r from-white/5 to-transparent rounded-r-3xl">
                            "{slogan}"
                        </p>

                        <div className="flex flex-wrap gap-8 pt-6">
                            <button 
                                onClick={onNavigateToLogin}
                                className="px-16 py-8 bg-primary text-slate-950 font-black rounded-[2.5rem] shadow-[0_30px_70px_-15px_rgba(217,119,6,0.6)] hover:bg-white hover:scale-105 transition-all flex items-center gap-6 text-3xl group active:scale-95 border-4 border-primary/20"
                            >
                                {t('cta_dashboard', 'पोर्टल लॉगिन')} <ArrowRightIcon className="h-10 w-10 group-hover:translate-x-4 transition-transform" />
                            </button>
                            <button 
                                onClick={onNavigateToLogin}
                                className="px-12 py-8 bg-white/5 border-2 border-white/10 text-white font-black rounded-3xl hover:bg-white/10 transition-all flex items-center gap-4 text-xl backdrop-blur-md group"
                            >
                                <UserCircleIcon className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform" />
                                {t('cta_student_access', 'छात्र लॉगिन')}
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative hidden lg:block">
                        <div className="animate-sunrise relative">
                            {/* Floating Tech Badges */}
                            <div className="absolute -top-12 -left-12 p-8 bg-slate-900 border-4 border-primary/20 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float">
                                <BoltIcon className="h-12 w-12 text-primary shadow-glow" />
                            </div>
                            <div className="absolute -bottom-12 -right-12 p-8 bg-slate-900 border-4 border-primary/20 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float-delayed">
                                <AcademicCapIcon className="h-12 w-12 text-primary shadow-glow" />
                            </div>
                            
                            <div className="bg-gradient-to-br from-slate-800 to-slate-950 border-[15px] border-slate-700/50 rounded-[8rem] p-24 shadow-[0_80px_160px_rgba(0,0,0,0.9)] relative overflow-hidden group flex items-center justify-center min-h-[500px]">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-white/5 opacity-50"></div>
                                <div className="relative z-10 w-full transform group-hover:scale-110 transition-transform duration-1000">
                                    {logoUrl ? (
                                        <img src={logoUrl} className="max-w-full max-h-full object-contain drop-shadow-[0_0_80px_rgba(217,119,6,0.7)]" alt={institutionName} />
                                    ) : (
                                        <EduSarthiLogo className="w-full h-auto drop-shadow-[0_0_80px_rgba(217,119,6,0.6)]" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: inline-flex;
                    animation: marquee 40s linear infinite;
                }
                .animate-pulse-slow {
                    animation: pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-40px) rotate(5deg); }
                }
                .animate-float {
                    animation: float 7s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float 8s ease-in-out infinite;
                    animation-delay: 2.5s;
                }
                .shadow-glow {
                    filter: drop-shadow(0 0 20px rgba(217, 119, 6, 0.8));
                }
            `}</style>
        </section>
    );
};

export default HeroSection;
