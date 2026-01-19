
import React, { Suspense } from 'react';
import { User, ServiceName } from '../types';
import { SERVICE_COMPONENTS } from '../config/servicesConfig';
import { BriefcaseIcon, SparklesIcon, BuildingOfficeIcon, UsersIcon, ArrowLeftIcon } from './icons/AllIcons';
import AiGlanceWidget from './AiGlanceWidget';
import ServicesPanel from './ServicesPanel';
import { useFilteredServices } from '../hooks/useFilteredServices';
import Loader from './Loader';

const CompanyDashboard: React.FC<{ user: User; activeService: ServiceName | 'overview'; setActiveService: (s: any) => void }> = ({ user, activeService, setActiveService }) => {
    const companyServices = useFilteredServices(user.role);

    if (activeService === 'overview') {
        return (
            <div className="space-y-8 animate-pop-in pb-20">
                {/* Corporate Header */}
                <div className="bg-slate-900 p-8 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-20 bg-primary/20 rounded-full blur-[100px]"></div>
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                            <BuildingOfficeIcon className="h-10 w-10 text-orange-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tight uppercase">{user.name}</h2>
                            <p className="text-slate-400 font-hindi">रिक्रूटर और प्लेसमेंट पार्टनर</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        <AiGlanceWidget user={user} />
                        
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                                <SparklesIcon className="h-6 w-6 text-primary"/>
                                हायरिंग टूल्स (Talent Tools)
                            </h3>
                            <ServicesPanel services={companyServices} onServiceSelect={setActiveService} gridClassName="grid grid-cols-1 sm:grid-cols-2 gap-4" />
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-[2.5rem] text-white shadow-xl">
                            <h4 className="font-black text-xs uppercase tracking-widest mb-4 opacity-70">Student Pool Stats</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold">Ready to Hire</span>
                                    <span className="text-3xl font-black">1,250</span>
                                </div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-400 w-3/4"></div>
                                </div>
                                <p className="text-[10px] uppercase font-black opacity-60 tracking-wider">Top 75% Skill Verified by AI</p>
                            </div>
                        </div>

                        <div className="bg-slate-100 p-6 rounded-[2.5rem] border border-slate-200">
                             <h4 className="font-bold text-slate-800 mb-2">Campus Engagement</h4>
                             <p className="text-xs text-slate-500 leading-relaxed">संस्थान के साथ मिलकर वेबिनार या वर्कशॉप आयोजित करें और अपना ब्रांड बनाएं।</p>
                             <button className="mt-4 w-full py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">CONNECT WITH DEAN</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const ServiceComponent = SERVICE_COMPONENTS[activeService];
    return (
        <div className="animate-pop-in min-h-[600px] pb-20">
             <button onClick={() => setActiveService('overview')} className="mb-6 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-slate-50 shadow-sm transition-all active:scale-95">
                 <ArrowLeftIcon className="h-5 w-5"/> वापस डैशबोर्ड
             </button>
             <div className="bg-white p-8 rounded-[3.5rem] shadow-xl border border-slate-100 min-h-[600px]">
                {ServiceComponent ? (
                    <Suspense fallback={<Loader message="मोड्यूल खुल रहा है..." />}>
                        <ServiceComponent user={user} setActiveService={setActiveService} />
                    </Suspense>
                ) : (
                    <div className="text-center py-20 text-slate-400 font-hindi">यह सर्विस अभी लोड हो रही है...</div>
                )}
             </div>
        </div>
    );
};

export default CompanyDashboard;
