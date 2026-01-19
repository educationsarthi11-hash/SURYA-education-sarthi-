
import React, { Suspense } from 'react';
import { ServiceName, User } from '../types';
import { SERVICE_COMPONENTS } from '../config/servicesConfig';
import { 
    ArrowLeftIcon, SparklesIcon, 
    PaintBrushIcon, PhoneIcon, AcademicCapIcon, HeartIcon
} from './icons/AllIcons';
import Loader from './Loader';
import AiGlanceWidget from './AiGlanceWidget';
import ManagementPanel from './ManagementPanel';

const TeacherDashboard: React.FC<{ user: User; activeService: ServiceName | 'overview'; setActiveService: (s: any) => void }> = ({ user, activeService, setActiveService }) => {
    
    const config = {
        panelTitle: "Teacher Management Console",
        sections: [
            {
                title: "Teaching Tools (पढ़ाना और बोर्ड)",
                services: ['AI Smart Board', 'Classroom', 'AI Video Generator', 'Smart Library', 'Interactive 3D Lab'] as ServiceName[]
            },
            {
                title: "Student & Parent Connect (संपर्क)",
                services: ['Smart Digital Diary', 'Attendance Log', 'Face Attendance', 'Progress Monitor', 'AI Parent Voice Hub'] as ServiceName[]
            },
            {
                title: "Academic Admin (मैनेजमेंट कार्य)",
                services: ['AI Homework Hub', 'Test Paper Guru', 'Syllabus Tracker', 'Lesson Planner', 'Automated Timetable Generator'] as ServiceName[]
            },
            {
                title: "My Office (स्टाफ टूल्स)",
                services: ['Smart HR Manager', 'Smart Proxy Manager', 'Change Password', 'Video Guide'] as ServiceName[]
            }
        ]
    };

    if (activeService === 'overview') {
        return (
            <div className="space-y-8 animate-pop-in pb-32">
                {/* Modernized Teacher Hero */}
                <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group border-4 border-white/10">
                    <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Sarthi Teacher Portal</span>
                            </div>
                            <h2 className="text-5xl font-black tracking-tight leading-none">
                                नमस्ते, {user.name.split(' ')[0]} जी! 🍎
                            </h2>
                            <p className="text-indigo-200 font-hindi text-xl opacity-90 max-w-lg leading-relaxed">
                                आपका मैनेजमेंट पैनल तैयार है। यहाँ से आप क्लास, बच्चों की प्रोग्रेस और अपनी छुट्टी मैनेज कर सकते हैं।
                            </p>
                        </div>
                        <div className="flex gap-4">
                             <button onClick={() => setActiveService('AI Smart Board')} className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                                OPEN BOARD
                             </button>
                        </div>
                    </div>
                </div>

                <AiGlanceWidget user={user} />
                
                <ManagementPanel config={config} handleServiceSelect={setActiveService} />
            </div>
        );
    }

    const ServiceComponent = SERVICE_COMPONENTS[activeService];
    return (
        <div className="animate-pop-in-up h-full flex flex-col relative pb-20">
            <header className="flex items-center justify-between mb-8 sticky top-0 bg-slate-50/90 backdrop-blur-md py-4 z-50">
                <button onClick={() => setActiveService('overview')} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200 text-slate-900 hover:text-primary transition-all active:scale-90 flex items-center justify-center gap-3 font-bold group">
                    <ArrowLeftIcon className="h-6 w-6 group-hover:-translate-x-1 transition-transform" /> <span className="font-hindi text-sm">वापस (Back)</span>
                </button>
                <div className="text-right">
                    <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tighter leading-none">{activeService}</h2>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mt-1">Teacher Management</p>
                </div>
            </header>
            
            <div className="flex-1 bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden relative min-h-[800px]">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-indigo-600"></div>
                {ServiceComponent && (
                    <Suspense fallback={<Loader message="मोड्यूल खुल रहा है..." />}>
                        <ServiceComponent user={user} setActiveService={setActiveService} />
                    </Suspense>
                )}
            </div>
        </div>
    );
};

export default TeacherDashboard;
