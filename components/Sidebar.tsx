
import React, { useState, memo } from 'react';
import { User, ServiceName, UserRole } from '../types';
import { 
    EduSarthiLogo, Squares2X2Icon, 
    Cog6ToothIcon, ChartBarIcon, 
    ChevronLeftIcon, ChevronRightIcon, 
    ShieldCheckIcon, CheckCircleIcon, 
    ArchiveBoxIcon, PencilSquareIcon,
    CurrencyRupeeIcon, BuildingStorefrontIcon,
    UserPlusIcon, UsersIcon, ArrowDownTrayIcon,
    ArrowLeftOnRectangleIcon, GlobeAltIcon,
    BuildingOfficeIcon, BuildingLibraryIcon,
    BanknotesIcon, SunIcon, SignalIcon
} from './icons/AllIcons';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppConfig } from '../contexts/AppConfigContext';

interface SidebarProps {
  user: User;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeService: ServiceName | 'overview';
  setActiveService: (service: ServiceName | 'overview') => void;
}

const NavigationItem = memo(({ name, label, icon, isActive, isCollapsed, isHindi, onClick }: { name: ServiceName | 'overview', label: string, icon: React.ReactNode, isActive: boolean, isCollapsed: boolean, isHindi: boolean, onClick: () => void }) => {
    const navItemClass = `
      group flex items-center px-4 py-4 text-sm font-bold rounded-2xl transition-all duration-300 mb-2 mx-2 relative
      ${isActive 
          ? 'bg-primary text-slate-950 shadow-xl shadow-primary/30 scale-[1.03]' 
          : 'text-slate-400 hover:bg-white/5 hover:text-white'}
      ${isCollapsed ? 'justify-center' : ''}
      ${isHindi ? 'font-hindi tracking-wide' : ''}
    `;
    return (
        <button onClick={onClick} className={navItemClass} title={isCollapsed ? label : ''}>
            <div className={`flex-shrink-0 ${isCollapsed ? '' : 'mr-4'}`}>
                {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
                    className: `h-6 w-6 ${isActive ? 'text-slate-950' : 'text-slate-500 group-hover:text-primary transition-colors duration-300'}` 
                })}
            </div>
            {!isCollapsed && <span className="truncate uppercase tracking-wider text-[11px] antialiased">{label}</span>}
            {isActive && !isCollapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse"></div>}
        </button>
    );
});

const Sidebar: React.FC<SidebarProps> = ({ user, isOpen, setIsOpen, activeService, setActiveService }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogoError, setIsLogoError] = useState(false);
  const { t, language } = useLanguage();
  const { institutionName, logoUrl } = useAppConfig();
  const isHindi = language === 'hi' || language === 'hr';
  const isAdmin = [UserRole.Admin, UserRole.School, UserRole.College, UserRole.University, UserRole.TechnicalInstitute].includes(user.role);

  const sidebarClasses = `
    bg-slate-950 text-white flex flex-col flex-shrink-0 h-full no-print border-r border-white/5
    fixed lg:static top-0 inset-y-0 left-0 z-[60] shadow-2xl lg:shadow-none
    transform transition-all duration-500 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
    ${isCollapsed ? 'w-24' : 'w-80'}
  `;

  const renderNavItem = (name: ServiceName | 'overview', labelKey: string, icon: React.ReactNode) => (
      <NavigationItem 
          key={name} name={name} label={t(labelKey, labelKey)} icon={icon}
          isActive={activeService === name} isCollapsed={isCollapsed}
          isHindi={isHindi}
          onClick={() => { setActiveService(name); if(window.innerWidth < 1024) setIsOpen(false); }}
      />
  );

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-[55] lg:hidden backdrop-blur-md" onClick={() => setIsOpen(false)}></div>}
      <aside className={sidebarClasses}>
        {/* Admin Header */}
        <div className={`h-24 flex items-center ${isCollapsed ? 'justify-center' : 'px-8'} border-b border-white/5 bg-white/2 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="bg-white p-2 rounded-2xl shadow-2xl flex-shrink-0 overflow-hidden w-12 h-12 flex items-center justify-center border-2 border-primary/20">
                {logoUrl && !isLogoError ? (
                    <img src={logoUrl} className="max-h-full max-w-full object-contain" alt="Logo" onError={() => setIsLogoError(true)} />
                ) : (
                    <SunIcon className="h-8 w-8 text-primary animate-pulse" />
                )}
            </div>
            {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                    <span className="font-black text-sm tracking-tighter truncate uppercase leading-none text-white italic">ENTERPRISE <span className="text-primary">HQ</span></span>
                    <span className="text-[10px] font-bold text-slate-500 mt-1.5 uppercase tracking-widest truncate">{institutionName}</span>
                </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-8 custom-scrollbar px-3">
            {renderNavItem("overview", "COMMAND CENTER", <Squares2X2Icon />)}
            
            {isAdmin && (
                <>
                    <div className={`mt-10 px-6 text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4 flex items-center gap-3 ${isCollapsed ? 'justify-center px-0' : ''}`}>
                        {!isCollapsed && <div className="w-4 h-px bg-slate-800"></div>}
                        {!isCollapsed ? 'CORE SYSTEMS' : '---'}
                    </div>
                    {renderNavItem("Smart Admissions", "AI ONBOARDING", <UserPlusIcon />)}
                    {renderNavItem("Student Database", "NETWORK REGISTRY", <UsersIcon />)}
                    {renderNavItem("Fee Management", "FINANCE NODE", <CurrencyRupeeIcon />)}
                    
                    <div className={`mt-12 px-6 text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4 flex items-center gap-3 ${isCollapsed ? 'justify-center px-0' : ''}`}>
                         {!isCollapsed && <div className="w-4 h-px bg-slate-800"></div>}
                         {!isCollapsed ? 'INFRASTRUCTURE' : '---'}
                    </div>
                    {renderNavItem("Inventory Manager", "ASSET CONTROL", <ArchiveBoxIcon />)}
                    {renderNavItem("Analytics Dashboard", "GLOBAL STATS", <ChartBarIcon />)}
                    {renderNavItem("Franchise Configurator", "Setup Wizard", <Cog6ToothIcon />)}
                    {renderNavItem("Franchise Plans", "PRICING TIERS", <BanknotesIcon />)}
                    {renderNavItem("Sync Center" as any, "CLOUD BRIDGE", <SignalIcon />)}
                </>
            )}
        </div>

        {/* Admin Footer */}
        <div className="p-8 border-t border-white/5 bg-black/40">
            <div className="flex items-center gap-5">
                <div className="h-12 w-12 rounded-2xl border-2 border-primary/30 p-1 overflow-hidden shadow-2xl bg-slate-900 flex items-center justify-center">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`} alt="Admin" className="w-full h-full object-cover rounded-xl" />
                </div>
                {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-black truncate text-white leading-none mb-1">{user.name}</p>
                        <p className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                             Super User
                        </p>
                    </div>
                )}
            </div>
            
            <div className="mt-8 flex gap-3">
                 <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center"
                 >
                    {isCollapsed ? <ChevronRightIcon className="h-5 w-5"/> : <ChevronLeftIcon className="h-5 w-5"/>}
                 </button>
                 {!isCollapsed && (
                     <button className="flex-1 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                         LOCK
                     </button>
                 )}
            </div>

            {!isCollapsed && (
                <div className="mt-6 text-[8px] font-bold text-slate-700 uppercase tracking-[0.3em] text-center">
                    Sarthi Enterprise OS v4.3.0
                </div>
            )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
