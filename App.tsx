
import React, { Component, useState, useEffect, ErrorInfo, ReactNode } from 'react';
import { UserRole, User, ServiceName } from './types';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar'; 
import { MenuIcon, WrenchScrewdriverIcon, ArrowLeftOnRectangleIcon, EduSarthiLogo, BoltIcon } from './components/icons/AllIcons';
import Login from './components/Login';
import AdmissionScreen from './components/AdmissionScreen';
import Website from './components/Website';
import SetupScreen from './components/SetupScreen'; 
import { useAppConfig } from './contexts/AppConfigContext';
import VoiceNavigation from './components/VoiceNavigation';
import { useLanguage } from './contexts/LanguageContext'; 
import { ThemeCustomizer } from './components/ThemeCustomizer'; 
import GlobalReader from './components/GlobalReader';
import SOSButton from './components/SOSButton';
import LocalizationModal from './components/LocalizationModal';
import OfflineIndicator from './components/OfflineIndicator';

interface ErrorBoundaryProps { children?: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; error: Error | null; errorInfo: ErrorInfo | null; }

const GlobalWatermark = () => {
  const { logoUrl } = useAppConfig();
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center select-none opacity-[0.05] transition-all duration-1000">
        {logoUrl ? (
            <img src={logoUrl} className="w-[70vw] h-[70vw] object-contain grayscale animate-pulse-slow" alt="" />
        ) : (
            <div className="scale-[6] rotate-[-15deg] opacity-20">
                <EduSarthiLogo />
            </div>
        )}
    </div>
  );
};

// Fix: Explicitly define generic types for Component<ErrorBoundaryProps, ErrorBoundaryState> 
// to ensure 'setState' and 'props' are correctly typed and recognized by the compiler.
class GlobalErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false, error: null, errorInfo: null };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState { 
    return { hasError: true, error, errorInfo: null }; 
  }
  
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) { 
    // Fix: setState is now recognized correctly via the Generic type definition
    this.setState({ error, errorInfo }); 
    console.error("Critical System Audit:", error, errorInfo);
  }
  
  private handleReload = () => { 
    localStorage.clear(); // Reset on critical failure to clear malformed data
    window.location.reload(); 
  }
  
  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-6 text-center text-white">
          <div className="bg-slate-900 p-12 rounded-[4rem] shadow-2xl max-w-lg w-full border-4 border-red-500/20 font-sans relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><BoltIcon className="h-40 w-40"/></div>
            <WrenchScrewdriverIcon className="h-20 w-20 text-red-500 mx-auto mb-8 animate-bounce" />
            <h1 className="text-4xl font-black mb-4 font-hindi uppercase tracking-tighter">System Error</h1>
            <p className="text-slate-400 mb-10 font-hindi text-lg leading-relaxed">क्षमा करें, मॉड्यूल लोड करने में समस्या हुई। हमने इसे ठीक करने के लिए सिस्टम रिसेट कर दिया है।</p>
            <button onClick={this.handleReload} className="w-full py-6 bg-red-600 text-white rounded-3xl font-black shadow-2xl hover:scale-105 transition-all uppercase tracking-widest active:scale-95">REBOOT & CLEAN SYNC</button>
          </div>
        </div>
      );
    }
    // Fix: props.children is now recognized correctly via the Generic type definition
    return this.props.children;
  }
}

const AppContent: React.FC = () => {
  const [appState, setAppState] = useState<'website' | 'login' | 'setup' | 'admission' | 'dashboard'>('website');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { institutionName } = useAppConfig();
  const [activeService, setActiveService] = useState<ServiceName | 'overview'>('overview');
  const { t } = useLanguage(); 

  const [isLocalizationModalOpen, setIsLocalizationModalOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('sarthi_logged_user');
    if (savedUser) {
        try {
            setCurrentUser(JSON.parse(savedUser));
            setAppState('dashboard');
        } catch(e) { localStorage.removeItem('sarthi_logged_user'); }
    }

    const hasSetRegion = localStorage.getItem('sarthi_country_tag');
    if (!hasSetRegion) {
        setIsLocalizationModalOpen(true);
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === UserRole.Student) {
        setAppState('setup');
    } else {
        setAppState('dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sarthi_logged_user');
    setCurrentUser(null);
    setAppState('website');
    setActiveService('overview');
  };

  return (
    <div className="flex h-screen h-[100dvh] bg-slate-50 text-slate-900 font-sans overflow-hidden w-full relative">
      <GlobalWatermark />
      <OfflineIndicator />
      <LocalizationModal isOpen={isLocalizationModalOpen} onClose={() => {
          localStorage.setItem('sarthi_country_tag', 'set');
          setIsLocalizationModalOpen(false);
      }} />

      <div className="relative z-10 w-full h-full flex overflow-hidden">
          {appState === 'website' && (
            <div className="w-full h-full overflow-y-auto bg-white/40 backdrop-blur-[2px] scroll-smooth custom-scrollbar">
                <Website onNavigateToLogin={() => setAppState('login')} onNavigateToAdmission={() => setAppState('admission')} />
            </div>
          )}

          {appState === 'login' && (
            <div className="w-full h-full overflow-y-auto animate-fade-in bg-white/50 custom-scrollbar">
                <Login onLoginSuccess={handleLoginSuccess} onBackToWebsite={() => setAppState('website')} />
            </div>
          )}

          {appState === 'setup' && currentUser && (
              <SetupScreen user={currentUser} onSetupComplete={() => setAppState('dashboard')} />
          )}

          {appState === 'admission' && (
            <div className="w-full h-full overflow-y-auto bg-white/40 animate-slide-in-up custom-scrollbar">
                <AdmissionScreen onBack={() => setAppState('login')} />
            </div>
          )}
          
          {appState === 'dashboard' && currentUser && (
            <>
              <Sidebar 
                user={currentUser} 
                isOpen={isSidebarOpen} 
                setIsOpen={setSidebarOpen} 
                activeService={activeService} 
                setActiveService={(s) => {setActiveService(s); setSidebarOpen(false);}} 
              />
              
              <main className="flex-1 flex flex-col h-full overflow-hidden bg-transparent relative transition-all duration-300 w-full">
                <header className="h-16 bg-white/70 backdrop-blur-md border-b flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 lg:hidden bg-slate-100 rounded-xl transition-transform active:scale-90"><MenuIcon className="h-6 w-6" /></button>
                        <div className="font-black text-slate-800 tracking-tighter uppercase truncate max-w-[200px] sm:max-w-[400px] text-lg">
                            {activeService === 'overview' ? institutionName : activeService}
                        </div>
                    </div>
                    <button onClick={handleLogout} className="text-xs font-black text-red-600 bg-red-50 px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all hover:bg-red-600 hover:text-white shadow-sm active:scale-95">
                        <ArrowLeftOnRectangleIcon className="h-4 w-4"/> {t('Logout', 'लॉग आउट')}
                    </button>
                </header>
                
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 custom-scrollbar">
                    <div className="max-w-[1600px] mx-auto">
                        <Dashboard user={currentUser} activeService={activeService} setActiveService={setActiveService} />
                    </div>
                </div>

                <div className="fixed bottom-24 left-6 z-[100] no-print">
                     <SOSButton />
                </div>
                
                <div className="fixed bottom-6 left-6 z-[100] no-print">
                     <GlobalReader />
                </div>

                <div className="fixed bottom-8 right-8 z-[100] no-print">
                     <VoiceNavigation onNavigate={setActiveService} />
                </div>
              </main>
            </>
          )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GlobalErrorBoundary>
      <AppContent />
      <ThemeCustomizer />
    </GlobalErrorBoundary>
  );
};

export default App;
