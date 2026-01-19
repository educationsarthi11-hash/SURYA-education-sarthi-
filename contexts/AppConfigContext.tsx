
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { LocationType } from '../types';

interface AppConfig {
    selectedCountry: string;
    selectedState: string;
    selectedBoard: string;
    institutionType: LocationType;
    institutionName: string;
    slogan: string;
    logoUrl?: string;
    primaryColor: string; 
    userName: string;
    fatherName: string;
    motherName: string;
    dob: string;
    tob: string;
}

interface AppConfigContextType extends AppConfig {
    setConfirmConfig: (config: Partial<AppConfig>) => void;
    setConfig: (config: Partial<AppConfig>) => void;
}

const AppConfigContext = createContext<AppConfigContextType | undefined>(undefined);

// मास्टर डिफ़ॉल्ट्स
const DEFAULT_CONFIG: AppConfig = {
    selectedCountry: 'India',
    selectedState: 'Haryana', 
    selectedBoard: 'CBSE',
    institutionType: LocationType.School,
    institutionName: 'Surya Education Sarthi',
    slogan: 'ज्ञान का प्रकाश, सफलता का विश्वास।',
    logoUrl: undefined,
    primaryColor: '#d97706', 
    userName: 'Suryanshu',
    fatherName: 'Manoj Kumar',
    motherName: 'Dhapa Kumari',
    dob: '2024-05-03',
    tob: '12:32'
};

const getInitialState = (): AppConfig => {
    try {
        const storedConfigRaw = localStorage.getItem('appConfig_v3_ESS');
        if (storedConfigRaw) {
            const parsed = JSON.parse(storedConfigRaw);
            // डीप मर्ज सुनिश्चित करें ताकि कोई नई की (key) छूट न जाए
            return { ...DEFAULT_CONFIG, ...parsed };
        }
    } catch (e) {
        console.error("Storage loading error:", e);
    }
    return DEFAULT_CONFIG;
};

export const AppConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [config, setConfigState] = useState<AppConfig>(getInitialState);

    const setConfig = (newConfig: Partial<AppConfig>) => {
        setConfigState(prev => {
            const updated = { ...prev, ...newConfig };
            // तुरंत सेव करें ताकि डेटा लॉस न हो
            localStorage.setItem('appConfig_v3_ESS', JSON.stringify(updated));
            return updated;
        });
    };

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', config.primaryColor);
        root.style.setProperty('--color-primary-light', `${config.primaryColor}30`);
        root.style.setProperty('--color-primary-dark', '#92400e'); 
        
        document.body.style.backgroundColor = '#0f172a';
        document.body.style.backgroundImage = "radial-gradient(circle at top right, #451a03 0%, transparent 600px)";
    }, [config.primaryColor]);

    return (
        <div className="eco-system-root h-full overflow-hidden">
            <AppConfigContext.Provider value={{ ...config, setConfig, setConfirmConfig: setConfig }}>
                {children}
            </AppConfigContext.Provider>
        </div>
    );
};

export const useAppConfig = () => {
    const context = useContext(AppConfigContext);
    if (!context) throw new Error('useAppConfig must be used within an AppConfigProvider');
    return context;
};
