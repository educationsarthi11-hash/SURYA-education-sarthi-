
import React, { Suspense } from 'react';
import { ServiceName, User } from '../types';
import ServicesPanel from './ServicesPanel';
import { SERVICE_COMPONENTS } from '../config/servicesConfig';
import { 
    ArrowLeftIcon, SparklesIcon, 
    AcademicCapIcon, BoltIcon, VideoCameraIcon,
    PaintBrushIcon, TrophyIcon, ChartBarIcon, 
    ShoppingCartIcon, WrenchScrewdriverIcon, RocketLaunchIcon,
    SunIcon
} from './icons/AllIcons';
import Loader from './Loader';
import { useFilteredServices } from '../hooks/useFilteredServices';
import GamificationWidget from './student_dashboard/GamificationWidget';
import ParentBridgeWidget from './student_dashboard/ParentBridgeWidget';
import SuryanshuAstroWidget from './student_dashboard/SuryanshuAstroWidget';
import StatusBar from './StatusBar';
import { useLanguage } from '../contexts/LanguageContext';
import { useClassroom } from '../contexts/ClassroomContext';

interface StudentDashboardProps {
  user: User;
  activeService: ServiceName | 'overview';
  setActiveService: (service: ServiceName | 'overview') => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, activeService, setActiveService }) => {
  const studentServices = useFilteredServices(user.role);
  const { t } = useLanguage();
  const { selectedClass, institutionType } = useClassroom();

  if (activeService === 'overview') {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 animate-pop-in relative pb-32">
            <div className="xl:col-span-8 space-y-8">
                
                <StatusBar user={user} />

                {/* Localized Hero for Mangmat */}
                <div className="bg-slate-900 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group border-4 border-white/5">
                    <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="space-y-6 text-center md:text-left flex-1">
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
                                    <SparklesIcon className="h-4 w-4 text-primary"/>
                                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-300">Mangmat Student Pro</span>
                                </div>
                                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-sm">
                                    <SunIcon className="h-4 w-4 text-primary animate-spin-slow" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">
                                        Level: {selectedClass}
                                    </span>
                                </div>
                            </div>
                            
                            <h3 className="text-6xl font-black tracking-tighter leading-none font-hindi">
                                {t('welcome', 'राम-राम')}, {user.name.split(' ')[0]}! ☀️
                            </h3>
                            <p className="text-slate-400 font-hindi text-2xl max-w-xl font-medium leading-relaxed">
                                {institutionType === 'ITI' 
                                    ? `थारी ${selectedClass} वर्कशॉप में आज नए औजार अनलॉक हुए हैं। अपना हुनर पूरी दुनिया को दिखाएं।`
                                    : `आज थारी पढ़ाई का नया शेड्यूल तैयार सै। के आज कुछ नया सीखना चाहोगे?`
                                }
                            </p>
                            <div className="pt-8 flex flex-wrap justify-center md:justify-start gap-5">
                                <button onClick={() => setActiveService('AI Global Bazaar')} className="bg-primary text-slate-950 px-10 py-5 rounded-3xl font-black text-sm shadow-[0_20px_50px_rgba(245,158,11,0.3)] hover:bg-white transition-all flex items-center gap-3 active:scale-95 transform hover:-translate-y-1">
                                    <ShoppingCartIcon className="h-6 w-6" /> ग्लोबल बाज़ार (ENTER BAZAAR)
                                </button>
                                <button onClick={() => setActiveService('AI Smart Board')} className="bg-white/5 backdrop-blur-md text-white border-2 border-white/10 px-10 py-5 rounded-3xl font-black text-sm shadow-xl hover:bg-white hover:text-slate-950 transition-all flex items-center gap-3 group">
                                    <PaintBrushIcon className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform"/> स्मार्ट बोर्ड
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ParentBridgeWidget />
                    <SuryanshuAstroWidget />
                </div>
                
                <div className="mt-12">
                    <ServicesPanel services={studentServices} onServiceSelect={setActiveService} />
                </div>
            </div>

            <div className="xl:col-span-4 space-y-8">
                <GamificationWidget user={user} onNavigate={setActiveService} />
                
                {/* Localized Incubator Widget */}
                <div className="bg-indigo-600 p-8 rounded-[3.5rem] text-white shadow-2xl border-4 border-indigo-500 relative overflow-hidden group">
                    <div className="absolute bottom-0 right-0 p-8 opacity-10 rotate-12 group-hover:scale-110 transition-transform"><RocketLaunchIcon className="h-32 w-32"/></div>
                    <div className="relative z-10">
                        <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-indigo-200 mb-6">Student Incubator</h4>
                        <p className="font-hindi text-2xl font-bold leading-relaxed mb-10">अपने हाथ से बनाई पेंटिंग या मॉडल को ऑनलाइन बेचें और कमाई शुरू करें।</p>
                        <button onClick={() => setActiveService('AI Global Bazaar')} className="w-full py-5 bg-white text-indigo-700 font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-50 transition-all active:scale-95">Lauch My Project Now</button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                    <h4 className="font-black text-xs uppercase tracking-[0.3em] text-primary mb-8 border-b pb-4">Next Classes</h4>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start border-l-4 border-primary pl-6">
                             <div className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">10:00 AM</div>
                             <div>
                                 <p className="font-black text-slate-800 text-lg leading-none">Practical Session</p>
                                 <p className="text-sm text-slate-500 font-hindi mt-1">वर्कशॉप अभ्यास</p>
                             </div>
                        </div>
                        <div className="flex gap-4 items-start border-l-4 border-slate-100 pl-6 opacity-60">
                             <div className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">02:30 PM</div>
                             <div>
                                 <p className="font-black text-slate-800 text-lg leading-none">AI Quiz Battle</p>
                                 <p className="text-sm text-slate-500 font-hindi mt-1">साप्ताहिक टेस्ट</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  const ServiceComponent = SERVICE_COMPONENTS[activeService];
  return (
    <div className="animate-pop-in-up h-full flex flex-col relative pb-20">
      <header className="flex items-center justify-between mb-8 sticky top-0 bg-slate-50/90 backdrop-blur-md py-4 z-50">
          <div className="flex items-center gap-4">
              <button onClick={() => setActiveService('overview')} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200 text-slate-900 hover:text-primary transition-all active:scale-90 flex items-center gap-3 font-bold">
                  <ArrowLeftIcon className="h-6 w-6" /> <span className="font-hindi text-sm">वापस (Back)</span>
              </button>
              <div className="h-10 w-px bg-slate-200 mx-2"></div>
              <h2 className="text-2xl font-black text-slate-950 tracking-tighter uppercase leading-none">{activeService}</h2>
          </div>
      </header>
      <div className="flex-1 bg-white rounded-[4rem] shadow-2xl border border-slate-200 overflow-hidden relative min-h-[800px] p-1">
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary via-orange-500 to-indigo-600"></div>
          {ServiceComponent ? (
            <Suspense fallback={<Loader message="AI मास्टर तैयारी कर रहे हैं..." />}>
                <ServiceComponent user={user} setActiveService={setActiveService} />
            </Suspense>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-300 font-black uppercase tracking-widest">Loading Sarthi Module...</div>
          )}
      </div>
    </div>
  );
};

export default StudentDashboard;
