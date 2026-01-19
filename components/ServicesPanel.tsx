
import React, { useState, useMemo } from 'react';
import { Service, ServiceName, ServiceCategory } from '../types';
import {
    Squares2X2Icon,
    SparklesIcon,
    MagnifyingGlassIcon,
    XIcon
} from './icons/AllIcons';
import { useLanguage } from '../contexts/LanguageContext';

interface ServicesPanelProps {
    services: Service[];
    onServiceSelect: (serviceName: ServiceName) => void;
    gridClassName?: string;
}

const getCategoryColor = (category: ServiceCategory) => {
    switch (category) {
        case ServiceCategory.LEARN_PRACTICE: return 'blue';
        case ServiceCategory.CAREER_DEVELOPMENT: return 'purple';
        case ServiceCategory.CREATIVE_STUDIO: return 'pink';
        case ServiceCategory.ADMINISTRATION: return 'slate';
        case ServiceCategory.CAMPUS_LIFE: return 'orange';
        case ServiceCategory.HEALTH_WELLNESS: return 'green';
        case ServiceCategory.GROWTH_EXPANSION: return 'indigo';
        default: return 'primary';
    }
};

const ServiceCard: React.FC<{ service: Service, onSelect: () => void }> = React.memo(({ service, onSelect }) => {
    const { language } = useLanguage();
    const isHindi = language === 'hi';
    const description = isHindi && service.hindiDescription ? service.hindiDescription : service.description;
    const category = service.category || ServiceCategory.ADMINISTRATION;
    const color = getCategoryColor(category);

    const iconBgClasses: {[key: string]: string} = {
        blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600',
        purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600',
        pink: 'bg-pink-50 text-pink-600 group-hover:bg-pink-600',
        slate: 'bg-slate-100 text-slate-600 group-hover:bg-slate-800',
        orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600',
        green: 'bg-green-50 text-green-600 group-hover:bg-green-600',
        indigo: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600',
        primary: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600',
    };

    return (
        <button 
            onClick={onSelect}
            className={`group relative w-full text-left bg-white p-3 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1`}
        >
            <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl mb-3 transition-all duration-300 ${iconBgClasses[color]} group-hover:text-white`}>
                {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: "h-5 w-5" })}
            </div>
            <h4 className={`text-sm font-black text-slate-800 mb-1 leading-tight ${isHindi ? 'font-hindi' : ''} line-clamp-1`}>
                {service.name}
            </h4>
            <p className={`text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2 ${isHindi ? 'font-hindi' : ''}`}>
                {description}
            </p>
        </button>
    );
});

const ServicesPanel: React.FC<ServicesPanelProps> = ({ services, onServiceSelect, gridClassName }) => {
    const { t } = useLanguage(); 
    const [searchQuery, setSearchQuery] = useState('');
    
    const filteredServices = useMemo(() => {
        if (!searchQuery.trim()) return services;
        const lowerQuery = searchQuery.toLowerCase();
        return services.filter(service => 
            service.name.toLowerCase().includes(lowerQuery) ||
            service.description.toLowerCase().includes(lowerQuery) ||
            (service.hindiDescription && service.hindiDescription.toLowerCase().includes(lowerQuery))
        );
    }, [services, searchQuery]);
    
    const groupedServices = useMemo(() => {
        return filteredServices.reduce((acc, service) => {
            const category = service.category || ServiceCategory.ADMINISTRATION;
            if (!acc[category]) acc[category] = [];
            acc[category].push(service);
            return acc;
        }, {} as Record<ServiceCategory, Service[]>);
    }, [filteredServices]);

    return (
        <div className="h-full w-full">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center">
                    <div className="bg-primary text-white p-2 rounded-xl shadow-lg mr-3">
                        <Squares2X2Icon className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t('Smart Tools Universe', 'स्मार्ट टूल्स ब्रह्मांड')}</h2>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{filteredServices.length} {t('Active Tools Found', 'सक्रिय टूल्स मिले')}</p>
                    </div>
                </div>
                
                <div className="relative w-full sm:w-80 group">
                    <input
                        type="text"
                        className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-2xl bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary text-sm transition-all shadow-sm"
                        placeholder={t("Search 80+ AI tools...", "80+ AI टूल्स खोजें...")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3.5 text-slate-400 hover:text-red-500"><XIcon className="h-5 w-5" /></button>}
                </div>
            </div>
            
            <div className="space-y-10 pb-20">
                {Object.values(ServiceCategory).map(category => {
                    const categoryServices = groupedServices[category];
                    if (!categoryServices || categoryServices.length === 0) return null;
                    return (
                        <div key={category} className="animate-fade-in-up">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-1 w-8 bg-primary rounded-full"></div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">{category}</h3>
                            </div>
                            <div className={gridClassName || "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"}>
                                {categoryServices.map(service => (
                                    <ServiceCard key={service.name} service={service} onSelect={() => onServiceSelect(service.name)} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ServicesPanel;
