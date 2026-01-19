
import React, { useState, useEffect } from 'react';
import { User, UserRole, LocationType } from '../types';
import { 
    UserCircleIcon, ShieldCheckIcon, SparklesIcon, 
    ArrowRightIcon, KeyIcon, 
    ArrowLeftIcon, CheckCircleIcon,
    BuildingOfficeIcon, GlobeAltIcon, AcademicCapIcon,
    PhoneIcon, MapPinIcon, SunIcon
} from './icons/AllIcons';
import { useToast } from '../hooks/useToast';
import { useAppConfig } from '../contexts/AppConfigContext';
import { useLanguage } from '../contexts/LanguageContext';
import { courseCatalog, getBoardsForType } from '../config/classroomData';
import { INDIAN_STATES } from '../config/institutions';

interface LoginProps {
    onLoginSuccess: (user: User) => void;
    onBackToWebsite: () => void;
}

type AuthView = 'login' | 'register' | 'forgot';

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBackToWebsite }) => {
    const toast = useToast();
    const { slogan, institutionName } = useAppConfig();
    const { selectedCountry, t } = useLanguage();
    
    const [view, setView] = useState<AuthView>('login');
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [regData, setRegData] = useState({ 
        name: '', 
        fatherName: '', 
        mobile: '', 
        parentMobile: '',
        instType: LocationType.School,
        course: '',
        state: 'Haryana',
        board: ''
    });

    const activeBoards = getBoardsForType(regData.instType, regData.state);
    const activeCourses = courseCatalog[regData.instType] || [];

    useEffect(() => {
        if (activeBoards.length > 0) setRegData(prev => ({ ...prev, board: activeBoards[0] }));
        if (activeCourses.length > 0) setRegData(prev => ({ ...prev, course: activeCourses[0] }));
    }, [regData.instType, regData.state]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if(!username || !password) { toast.error("कृपया ID और पासवर्ड भरें"); return; }
        
        setLoading(true);
        setTimeout(() => {
            const role = username.includes('admin') ? UserRole.Admin : 
                         username.includes('teacher') ? UserRole.Teacher :
                         username.includes('parent') ? UserRole.Parent :
                         username.includes('company') ? UserRole.Company : UserRole.Student;

            const mockUser: User = { 
                id: `ID-${Math.floor(1000 + Math.random() * 9000)}`, 
                name: username.split('@')[0], 
                role: role, 
                username: username,
                parentMobile: '9053144592'
            };
            localStorage.setItem('sarthi_logged_user', JSON.stringify(mockUser));
            toast.success("राम-राम! लॉगिन सफल हुआ।");
            onLoginSuccess(mockUser);
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 font-sans overflow-y-auto selection:bg-primary selection:text-white relative">
            {/* Background Solar Effect */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px]"></div>
            </div>

            <div className="w-full max-w-6xl bg-white rounded-[4rem] shadow-2xl overflow-hidden border-8 border-white/5 animate-pop-in relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[750px]">
                    
                    {/* Branding Side */}
                    <div className="lg:col-span-5 bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-primary/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="p-3 bg-white rounded-2xl shadow-glow">
                                    <SunIcon className="h-10 w-10 text-primary animate-spin-slow" />
                                </div>
                                <h1 className="text-3xl font-black tracking-tighter uppercase italic">
                                    SURYA <span className="text-primary">SARTHI</span>
                                </h1>
                            </div>
                            <h2 className="text-5xl lg:text-6xl font-black leading-[0.9] tracking-tighter uppercase mb-8">
                                <span className="text-primary font-hindi not-italic">मंगमत</span> <br/> 
                                DIGITAL HUB
                            </h2>
                            <p className="text-slate-400 text-2xl font-hindi italic border-l-4 border-primary pl-6 py-2 leading-relaxed">
                                "{slogan}"
                            </p>
                        </div>
                        <div className="relative z-10 mt-12 space-y-4">
                             <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                                 <ShieldCheckIcon className="h-6 w-6 text-green-400"/>
                                 <p className="text-[10px] font-black uppercase tracking-[0.2em]">Parents Connect Verified Portal</p>
                             </div>
                        </div>
                    </div>

                    {/* Action Side */}
                    <div className="lg:col-span-7 p-10 lg:p-20 flex flex-col justify-center bg-slate-50">
                        {view === 'login' ? (
                            <form onSubmit={handleLogin} className="space-y-10">
                                <div className="text-center lg:text-left">
                                    <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">Login</h3>
                                    <p className="text-slate-400 font-hindi font-bold mt-2 text-xl">नमस्ते! अपने अकाउंट में प्रवेश करें।</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative group">
                                        <UserCircleIcon className="absolute left-5 top-5 h-7 w-7 text-slate-300 group-focus-within:text-primary transition-colors"/>
                                        <input 
                                            type="text" 
                                            value={username} 
                                            onChange={e => setUsername(e.target.value)} 
                                            placeholder="User ID / Registered Mobile" 
                                            className="w-full p-6 pl-16 bg-white border-2 border-slate-100 rounded-[2rem] font-bold focus:border-primary outline-none shadow-xl transition-all" 
                                        />
                                    </div>
                                    <div className="relative group">
                                        <KeyIcon className="absolute left-5 top-5 h-7 w-7 text-slate-300 group-focus-within:text-primary transition-colors"/>
                                        <input 
                                            type="password" 
                                            value={password} 
                                            onChange={e => setPassword(e.target.value)} 
                                            placeholder="Password" 
                                            className="w-full p-6 pl-16 bg-white border-2 border-slate-100 rounded-[2rem] font-bold focus:border-primary outline-none shadow-xl transition-all" 
                                        />
                                    </div>
                                    <div className="flex justify-between items-center px-6">
                                        <button type="button" onClick={() => setView('forgot')} className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Forgot?</button>
                                        <button type="button" onClick={() => setView('register')} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-950">Register New</button>
                                    </div>
                                </div>

                                <button type="submit" disabled={loading} className="w-full py-7 bg-slate-950 text-white font-black rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] hover:bg-primary hover:text-slate-950 transition-all flex items-center justify-center gap-6 text-2xl uppercase tracking-tighter transform active:scale-95">
                                    {loading ? "AUTHENTICATING..." : "ENTER DASHBOARD"} <ArrowRightIcon className="h-10 w-10" />
                                </button>
                                
                                <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Multi-Role Security v4.3.1</p>
                            </form>
                        ) : (
                            <div className="text-center space-y-8 animate-slide-in-right">
                                <button onClick={() => setView('login')} className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase hover:text-primary mb-6"><ArrowLeftIcon className="h-4 w-4"/> Back to Login</button>
                                <h3 className="text-4xl font-black text-slate-900 uppercase">Registration</h3>
                                <p className="text-slate-500 font-hindi text-lg">नया पंजीकरण करने के लिए एडमिशन टीम से संपर्क करें या <br/> <b>Smart Admission</b> फॉर्म भरें।</p>
                                <div className="grid grid-cols-2 gap-4">
                                     <button className="p-6 bg-white border-2 border-slate-100 rounded-3xl font-black text-xs uppercase hover:border-primary transition-all">School</button>
                                     <button className="p-6 bg-white border-2 border-slate-100 rounded-3xl font-black text-xs uppercase hover:border-primary transition-all">ITI / Technical</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <button onClick={onBackToWebsite} className="mt-8 text-[10px] font-black text-slate-500 uppercase hover:text-primary transition-colors tracking-[0.5em]">Education Sarthi Smart OS</button>
        </div>
    );
};

export default Login;
