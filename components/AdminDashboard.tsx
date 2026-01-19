
import React, { useState, Suspense } from 'react';
import { ServiceName, User, LocationType, UserRole } from '../types';
import { SERVICE_COMPONENTS } from '../config/servicesConfig';
import { 
    ArrowLeftIcon, ShieldCheckIcon, BuildingOfficeIcon, 
    AcademicCapIcon, GlobeAltIcon, WrenchScrewdriverIcon,
    UsersIcon, ChartBarIcon, SparklesIcon,
    CurrencyRupeeIcon, PlusIcon, ExclamationTriangleIcon, SunIcon,
    ArrowRightIcon, BuildingLibraryIcon, SignalIcon, BoltIcon
} from './icons/AllIcons';
import Loader from './Loader';
import { useAppConfig } from '../contexts/AppConfigContext';
import SchoolManagementPanel from './SchoolManagementPanel';
import CollegeManagementPanel from './CollegeManagementPanel';
import UniversityManagementPanel from './UniversityManagementPanel';
import InstituteManagementPanel from './InstituteManagementPanel';
import FranchiseRegistrationForm from './FranchiseRegistrationForm';
import SystemHealth from './SystemHealth';
import AffiliationWidget from './frachise_dashboard/AffiliationWidget';

const AdminDashboard: React.FC<{ user: User; activeService: ServiceName | 'overview'; setActiveService: (s: any) => void }> = ({ user, activeService, setActiveService }) => {
    const { institutionName } = useAppConfig();
    const [adminMode, setAdminMode] = useState<'selection' | 'school' | 'college' | 'university' | 'institute' | 'franchise'>('selection');

    if (activeService === 'overview') {
        if (adminMode === 'selection') {
            return (
                <div className="space-y-10 animate-pop-in pb-24 max-w-7xl mx-auto">
                    {/* Executive Branding Header */}
                    <div className="bg-slate-950 p-12 rounded-[4rem] text-white relative overflow-hidden shadow-2xl border-4 border-white/5">
                        <div className="absolute top-0 right-0 p-32 bg-primary/10 rounded-full blur-[120px] -mr-16 -mt-16 animate-pulse-slow"></div>
                        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
                            <div className="text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 mb-6 backdrop-blur-md">
                                    <ShieldCheckIcon className="h-4 w-4 text-primary"/>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Enterprise Master Unit v4.3</span>
                                </div>
                                <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter italic leading-none mb-6">
                                    COMMAND <br/> <span className="text-primary not-italic">CENTER</span>
                                </h2>
                                <p className="text-slate-400 font-hindi text-2xl max-w-2xl leading-relaxed mx-auto lg:mx-0">
                                    नमस्ते एडमिन! मंगमत सार्थी ग्लोबल नेटवर्क का संचालन यहाँ से करें।
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 shrink-0 w-full lg:w-auto">
                                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                                    <p className="text-[10px] font-black text-primary uppercase mb-1">AI Nodes</p>
                                    <p className="text-3xl font-black">128</p>
                                </div>
                                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                                    <p className="text-[10px] font-black text-green-400 uppercase mb-1">Status</p>
                                    <p className="text-3xl font-black flex items-center gap-2 text-white">Live <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8">
                             <SystemHealth />
                        </div>
                        <div className="lg:col-span-4">
                             <AffiliationWidget />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
                            <div className="h-1 w-12 bg-primary rounded-full"></div>
                            Select Hub Department
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { id: 'school', title: 'School Hub', icon: <BuildingOfficeIcon />, color: 'orange', label: 'Primary/Secondary' },
                                { id: 'college', title: 'College Hub', icon: <BuildingLibraryIcon />, color: 'blue', label: 'UG / PG Degree' },
                                { id: 'university', title: 'University HQ', icon: <GlobeAltIcon />, color: 'purple', label: 'Affiliations' },
                                { id: 'institute', title: 'ITI / Technical', icon: <WrenchScrewdriverIcon />, color: 'teal', label: 'Skill Trades' }
                            ].map(hub => (
                                <button 
                                    key={hub.id} 
                                    onClick={() => setAdminMode(hub.id as any)} 
                                    className="group bg-white p-10 rounded-[3.5rem] border-2 border-slate-100 hover:border-primary transition-all shadow-sm hover:shadow-2xl text-center flex flex-col items-center"
                                >
                                    <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner ${
                                        hub.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                                        hub.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                        hub.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                        'bg-teal-50 text-teal-600'
                                    }`}>
                                        {React.cloneElement(hub.icon as React.ReactElement, { className: "h-10 w-10" })}
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 uppercase">{hub.title}</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{hub.label}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 p-12 rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group border-4 border-white/5">
                        <div className="absolute top-0 right-0 p-32 bg-primary/10 rounded-full blur-[100px] -mr-16 -mt-16 animate-pulse"></div>
                        <div className="relative z-10 flex-1 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary p-4 rounded-2xl shadow-2xl shadow-primary/30 rotate-3"><PlusIcon className="h-8 w-8 text-slate-950"/></div>
                                <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none italic">
                                    Expand the <br/> Sarthi Network
                                </h3>
                            </div>
                            <p className="text-slate-400 font-hindi text-2xl leading-relaxed max-w-xl">
                                नए स्कूल या कॉलेज को नेटवर्क में शामिल करने के लिए नीचे दिए गए बटन का प्रयोग करें।
                            </p>
                        </div>
                        <button 
                            onClick={() => setAdminMode('franchise')}
                            className="relative z-10 px-16 py-8 bg-primary text-slate-950 font-black rounded-[2.5rem] shadow-2xl hover:bg-white hover:scale-105 transition-all flex items-center gap-4 active:scale-95 uppercase tracking-widest text-2xl group"
                        >
                            नया पार्टनर जोड़ें <ArrowRightIcon className="h-8 w-8 group-hover:translate-x-3 transition-transform" />
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6 animate-pop-in pb-24">
                <button onClick={() => setAdminMode('selection')} className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 text-slate-400 font-black text-xs uppercase hover:text-primary transition-all mb-8 group active:scale-95">
                    <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-2 transition-transform"/> BACK TO GLOBAL CONSOLE
                </button>
                <div className="p-2">
                    {adminMode === 'school' && <SchoolManagementPanel setActiveService={setActiveService} />}
                    {adminMode === 'college' && <CollegeManagementPanel setActiveService={setActiveService} />}
                    {adminMode === 'university' && <UniversityManagementPanel setActiveService={setActiveService} />}
                    {adminMode === 'institute' && <InstituteManagementPanel setActiveService={setActiveService} />}
                    {adminMode === 'franchise' && <FranchiseRegistrationForm onComplete={() => setAdminMode('selection')} />}
                </div>
            </div>
        );
    }

    const ServiceComponent = SERVICE_COMPONENTS[activeService];
    return (
        <div className="animate-pop-in pb-24 h-full flex flex-col">
            <header className="flex items-center justify-between mb-10 sticky top-0 bg-slate-50/90 backdrop-blur-md py-6 z-50 px-2">
                <button onClick={() => setActiveService('overview')} className="px-8 py-4 bg-white rounded-3xl shadow-sm border-2 border-slate-100 text-slate-900 hover:text-primary transition-all flex items-center justify-center gap-4 active:scale-95 group">
                    <ArrowLeftIcon className="h-6 w-6 group-hover:-translate-x-2 transition-transform" /> 
                    <span className="font-hindi text-lg font-black tracking-widest uppercase">वापस कंट्रोल सेंटर</span>
                </button>
                <div className="text-right">
                    <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter leading-none">{activeService}</h2>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mt-2">Enterprise HQ Security Node</p>
                </div>
            </header>
            <div className="flex-1 bg-white rounded-[4rem] shadow-2xl border border-slate-100 p-10 min-h-[800px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary via-slate-900 to-primary"></div>
                {ServiceComponent ? (
                    <Suspense fallback={<div className="h-full flex items-center justify-center"><Loader message="Initializing Secure Protocol..." /></div>}>
                        <ServiceComponent user={user} setActiveService={setActiveService} />
                    </Suspense>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-300">
                         <ExclamationTriangleIcon className="h-20 w-20 mb-4 opacity-20" />
                         <p className="font-black uppercase tracking-widest">Component Not Found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
