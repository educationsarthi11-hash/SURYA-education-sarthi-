
import React, { useState, useEffect } from 'react';
import { ArrowRightIcon, MenuIcon, XIcon, EduSarthiLogo, GlobeAltIcon, SparklesIcon, ShieldCheckIcon, SunIcon } from './icons/AllIcons';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppConfig } from '../contexts/AppConfigContext';
import LocalizationModal from './LocalizationModal';

interface HeaderProps {
    onNavigateToLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToLogin }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);
    
    const { t, selectedCountry, selectedLanguage } = useLanguage();
    const { institutionName, logoUrl } = useAppConfig();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled ? 'py-2 bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl' : 'py-6 bg-transparent'}`}>
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex justify-between items-center">
                        
                        {/* Branding */}
                        <a href="#home" className="flex items-center gap-4 group">
                            <div className="relative p-1 bg-white rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform duration-500 group-hover:rotate-[360deg]">
                                {logoUrl ? (
                                    <img src={logoUrl} className="w-10 h-10 object-contain" alt="Logo" />
                                ) : (
                                    <SunIcon className="w-10 h-10 text-primary" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-white leading-none uppercase italic">
                                    <span className="text-primary font-hindi not-italic mr-1">सूर्य</span> {institutionName}
                                </h1>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1.5 flex items-center gap-1.5">
                                    <SparklesIcon className="h-2 w-2 text-primary animate-pulse" /> {selectedCountry.name} - मंगमत पोर्टल
                                </span>
                            </div>
                        </a>
                        
                        {/* Desktop Nav */}
                        <div className="flex items-center gap-4 lg:gap-10">
                            <nav className="hidden lg:flex items-center gap-10">
                                <a href="#features" className="text-[10px] font-black text-slate-300 hover:text-primary transition-all uppercase tracking-[0.25em] font-hindi">विशेषताएं</a>
                                <a href="#services" className="text-[10px] font-black text-slate-300 hover:text-primary transition-all uppercase tracking-[0.25em] font-hindi">AI टूल्स</a>
                                <a href="#pricing" className="text-[10px] font-black text-slate-300 hover:text-primary transition-all uppercase tracking-[0.25em] font-hindi">प्लान्स</a>
                            </nav>

                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => setIsLocalModalOpen(true)}
                                    className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
                                >
                                    <span className="text-lg">{selectedCountry.flag}</span>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{selectedLanguage.nativeName}</span>
                                </button>

                                <button 
                                    onClick={onNavigateToLogin} 
                                    className="flex items-center gap-3 bg-primary text-slate-950 px-6 py-3 rounded-2xl font-black text-[10px] shadow-2xl hover:bg-white transition-all transform hover:-translate-y-0.5 active:scale-95 uppercase tracking-widest"
                                >
                                    <span className="font-hindi text-sm">लॉगिन करें</span>
                                    <ArrowRightIcon className="h-4 w-4"/>
                                </button>

                                <button className="lg:hidden p-3 bg-white/5 rounded-2xl text-white shadow-sm active:scale-90" onClick={() => setIsMenuOpen(true)}>
                                    <MenuIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <LocalizationModal isOpen={isLocalModalOpen} onClose={() => setIsLocalModalOpen(false)} />

            {/* Mobile Sidebar Navigation */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl animate-fade-in" onClick={() => setIsMenuOpen(false)}>
                    <div className="absolute top-0 right-0 w-full max-w-xs h-full bg-slate-900 shadow-2xl p-10 flex flex-col animate-slide-in-right border-l border-white/5" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-16">
                            <div className="flex items-center gap-3">
                                <SunIcon className="h-8 w-8 text-primary" />
                                <span className="font-black text-white text-lg">SARTHI</span>
                            </div>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
                                <XIcon className="h-8 w-8" />
                            </button>
                        </div>
                        <nav className="space-y-8 flex-1">
                            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-black text-white font-hindi border-b border-white/5 pb-4">विशेषताएं</a>
                            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-black text-white font-hindi border-b border-white/5 pb-4">AI टूल्स</a>
                            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-black text-white font-hindi border-b border-white/5 pb-4">प्लान्स</a>
                        </nav>
                        <button 
                            onClick={() => { onNavigateToLogin(); setIsMenuOpen(false); }}
                            className="w-full bg-primary text-slate-950 py-5 rounded-3xl font-black text-sm shadow-xl uppercase tracking-widest font-hindi text-xl"
                        >
                            पोर्टल खोलें
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
