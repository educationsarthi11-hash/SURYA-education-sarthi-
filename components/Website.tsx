
import React from 'react';
import Header from './Header';
import HeroSection from './website/HeroSection';
import FranchiseHero from './website/FranchiseHero';
import FeaturesSection from './website/FeaturesSection';
import Footer from './website/Footer';
import ProgramsSection from './website/ProgramsSection';
import ContactSection from './website/ContactSection';
import PricingPage from './PricingPage';
import RoadmapSection from './website/RoadmapSection';
import ProspectusSection from './website/ProspectusSection';
import { SparklesIcon, ArrowRightIcon, WhatsAppIcon } from './icons/AllIcons';

interface WebsiteProps {
    onNavigateToLogin: () => void;
    onNavigateToAdmission: () => void;
}

const Website: React.FC<WebsiteProps> = ({ onNavigateToLogin, onNavigateToAdmission }) => {
    return (
        <div className="bg-[#fffdf7] text-slate-900 overflow-x-hidden selection:bg-primary selection:text-white">
            <Header onNavigateToLogin={onNavigateToLogin} />
            
            <main className="relative">
                {/* Hero Section */}
                <HeroSection onNavigateToLogin={onNavigateToLogin} />
                
                {/* Floating Fast-Action Bar */}
                <div className="sticky top-16 sm:top-20 z-[80] w-full bg-slate-950/80 backdrop-blur-md py-4 border-y border-white/10 shadow-2xl transition-all">
                    <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center animate-pulse">
                                <SparklesIcon className="h-6 w-6 text-white"/>
                            </div>
                            <p className="text-white font-hindi text-lg font-bold">
                                क्या आप नया दाखिला लेना चाहते हैं? <span className="text-primary-light">(AI Admission Open)</span>
                            </p>
                        </div>
                        <button 
                            onClick={onNavigateToAdmission}
                            className="px-8 py-3 bg-primary text-white font-black rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-600 transition-all uppercase tracking-widest flex items-center gap-3 active:scale-95"
                        >
                            अभी रजिस्टर करें <ArrowRightIcon className="h-4 w-4"/>
                        </button>
                    </div>
                </div>

                <FeaturesSection />
                <ProgramsSection />
                
                {/* New Section: Digital Prospectus */}
                <ProspectusSection />

                <FranchiseHero onNavigateToLogin={onNavigateToLogin} />

                <div id="pricing" className="py-32 bg-slate-50">
                     <div className="container mx-auto px-6">
                        <PricingPage />
                     </div>
                </div>

                <RoadmapSection />

                <div className="bg-white">
                    <ContactSection />
                </div>
            </main>

            {/* Floating Contact Widget */}
            <div className="fixed bottom-32 right-6 z-[110] flex flex-col gap-4 no-print">
                <a 
                    href="https://wa.me/919053144592?text=I%20want%20to%20know%20more%20about%20Mangmat%20School" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl hover:scale-110 transition-all border-4 border-white"
                    title="Direct WhatsApp"
                >
                    <WhatsAppIcon className="h-7 w-7" />
                    <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                        Chat with Support
                    </span>
                </a>
            </div>

            <Footer />

            <style>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Website;
