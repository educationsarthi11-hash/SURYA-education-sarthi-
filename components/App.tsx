
import React, { Component, useState, useEffect, ErrorInfo, ReactNode } from 'react';
import { UserRole, User, ServiceName } from '../types';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import { MenuIcon, WrenchScrewdriverIcon, ArrowLeftOnRectangleIcon, EduSarthiLogo } from './icons/AllIcons';
import Login from './Login';
import AdmissionScreen from './AdmissionScreen';
import Website from './Website';
import SetupScreen from './SetupScreen'; 
import { useAppConfig } from '../contexts/AppConfigContext';
// Fix: Corrected import paths as this file is already inside the 'components' folder
import VoiceNavigation from './VoiceNavigation';
import { useLanguage } from '../contexts/LanguageContext'; 
import { ThemeCustomizer } from './ThemeCustomizer'; 
import GlobalReader from './GlobalReader';
import SOSButton from './SOSButton';
import LocalizationModal from './LocalizationModal';

interface ErrorBoundaryProps { children?: ReactNode; } 
interface ErrorBoundaryState { hasError: boolean; error: Error | null; errorInfo: ErrorInfo | null; }

const GlobalWatermark = () => {
  const { logoUrl } = useAppConfig();
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center select-none opacity-[0.03] transition-opacity duration-1000">
        {logoUrl ? (
            <img src={logoUrl} className="w-[70vw] h-[70vw] object-contain grayscale" alt="" />
        ) : (
            <div className="scale-[6] rotate-[-15deg]">
                <EduSarthiLogo />
            </div>
        )}
    </div>
  );
};

// REPAIRED ERROR BOUNDARY: Standard Class implementation for max reliability
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
  }
  
  private handleReload = () => { window.location.reload(); }
  
  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-lg w-full border-4 border-red-100 animate-pop-in">
            <WrenchScrewdriverIcon className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-black text-slate-900 mb-4 font-hindi">सिस्टम रिपेयरिंग की जरूरत है</h1>
            <p className="text-slate-500 mb-8 font-medium">क्षमा करें, एक तकनीकी त्रुटि हुई है। हमने इंजीनियरों को सूचित कर दिया है।</p>
            <button onClick={this.handleReload} className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-xl hover:scale-105 transition-all">अभी ठीक करें (Reload)</button>
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

    const hasSetRegion = localStorage.getItem('sarthi_country');
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
    <div className="flex h-screen bg-[#fffdf7] text-slate-900 font-sans overflow-hidden w-full relative">
      <GlobalWatermark />
      <LocalizationModal isOpen={isLocalizationModalOpen} onClose={() => setIsLocalizationModalOpen(false)} />

      <div className="relative z-10 w-full h-full flex overflow-hidden">
          {appState === 'website' && (
            <div className="w-full h-full overflow-y-auto bg-white/30 backdrop-blur-[2px] scroll-smooth">
                <Website onNavigateToLogin={() => setAppState('login')} onNavigateToAdmission={() => setAppState('admission')} />
            </div>
          )}

          {appState === 'login' && (
            <div className="w-full h-full overflow-y-auto animate-fade-in">
                <Login onLoginSuccess={handleLoginSuccess} onBackToWebsite={() => setAppState('website')} />
            </div>
          )}

          {appState === 'setup' && currentUser && (
              <SetupScreen user={currentUser} onSetupComplete={() => setAppState('dashboard')} />
          )}

          {appState === 'admission' && (
            <div className="w-full h-full overflow-y-auto animate-slide-in-up">
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
              
              <main className="flex-1 flex flex-col h-full overflow-hidden bg-transparent relative transition-all duration-300">
                <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-8 z-30 sticky top-0 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 lg:hidden bg-slate-100 rounded-xl"><MenuIcon className="h-6 w-6" /></button>
                        <div className="font-black text-slate-800 tracking-tighter uppercase truncate max-w-[300px] text-lg">
                            {activeService === 'overview' ? institutionName : activeService}
                        </div>
                    </div>
                    <button handleLogout} className="text-xs font-black text-red-600 bg-red-50 px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all hover:bg-red-600 hover:text-white shadow-sm active:scale-95">
                        <ArrowLeftOnRectangleIcon className="h-4 w-4"/> {t('Logout', 'लॉग आउट')}
                    </button>
                </header>
                
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
                    <div className="max-w-[1500px] mx-auto">
                        <Dashboard user={currentUser} activeService={activeService} setActiveService={setActiveService} />
                    </div>
                </div>

                <div className="fixed bottom-24 left-8 z-[100] no-print">
                     <SOSButton />
                </div>
                
                <div className="fixed bottom-8 left-8 z-[100] no-print">
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
