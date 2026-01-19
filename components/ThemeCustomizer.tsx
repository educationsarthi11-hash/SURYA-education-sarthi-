
import React, { useState, useEffect } from 'react';
import { PencilSquareIcon, CheckCircleIcon, XIcon, EyeIcon } from './icons/AllIcons';

const THEME_VERSION = '2.2-LUCKY-COLORS'; // Increment to force theme reset for users

const themes = [
    { 
        name: 'Royal Blue (Shubh)', 
        primary: '#2563eb', 
        light: '#60a5fa', 
        dark: '#1e3a8a',
        secondary: '#ca8a04', // Dark Yellow (Lucky)
        accent: '#fbbf24'     // Gold (Lucky)
    },
    { 
        name: 'Orange', 
        primary: '#f97316', 
        light: '#fb923c', 
        dark: '#c2410c',
        secondary: '#ea580c',
        accent: '#fdba74'
    },
    { 
        name: 'Blue', 
        primary: '#3b82f6', 
        light: '#60a5fa', 
        dark: '#1d4ed8',
        secondary: '#0f766e',
        accent: '#22d3ee'
    },
    { 
        name: 'Purple', 
        primary: '#8b5cf6', 
        light: '#a78bfa', 
        dark: '#6d28d9',
        secondary: '#c026d3',
        accent: '#e879f9'
    },
    { 
        name: 'Teal', 
        primary: '#14b8a6', 
        light: '#2dd4bf', 
        dark: '#0f766e',
        secondary: '#0891b2',
        accent: '#67e8f9'
    },
    { 
        name: 'Rose', 
        primary: '#f43f5e', 
        light: '#fb7185', 
        dark: '#be123c',
        secondary: '#be185d',
        accent: '#f472b6'
    },
];

export const ThemeCustomizer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState('Royal Blue (Shubh)');
    const [zenMode, setZenMode] = useState(false);

    useEffect(() => {
        // FORCE UPDATE LOGIC: Check if we have applied the "Lucky Update"
        const savedVersion = localStorage.getItem('theme_version');
        const savedTheme = localStorage.getItem('app-theme');
        const savedZen = localStorage.getItem('app-zen');
        
        let themeToApply = themes[0]; // Default to Lucky Colors

        if (savedVersion === THEME_VERSION) {
             // If version matches, respect user's existing choice
             if (savedTheme) {
                 const foundTheme = themes.find(t => t.name === savedTheme);
                 if (foundTheme) themeToApply = foundTheme;
             }
        } else {
            // New version! Force the Lucky Theme to ensure user sees the update
            console.log("Applying Lucky Colors Update...");
            localStorage.setItem('theme_version', THEME_VERSION);
            themeToApply = themes[0]; // Force Royal Blue
        }

        applyTheme(themeToApply);
        
        if (savedZen === 'true') {
            setZenMode(true);
            document.documentElement.classList.add('zen-mode');
        }
    }, []);

    const applyTheme = (theme: typeof themes[0]) => {
        document.documentElement.style.setProperty('--color-primary', theme.primary);
        document.documentElement.style.setProperty('--color-primary-light', theme.light);
        document.documentElement.style.setProperty('--color-primary-dark', theme.dark);
        document.documentElement.style.setProperty('--color-secondary', theme.secondary);
        document.documentElement.style.setProperty('--color-accent', theme.accent);
        
        setActiveTheme(theme.name);
        localStorage.setItem('app-theme', theme.name);
    };

    const toggleZenMode = () => {
        const newMode = !zenMode;
        setZenMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('zen-mode');
        } else {
            document.documentElement.classList.remove('zen-mode');
        }
        localStorage.setItem('app-zen', String(newMode));
    };

    return (
        <div className={`fixed top-24 right-0 z-[60] flex items-start transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} no-print`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-slate-900 text-white p-3 rounded-l-xl shadow-lg hover:bg-slate-800 transition-colors mt-4 flex flex-col gap-2 items-center"
                title="Theme Settings"
            >
                {isOpen ? <XIcon className="h-6 w-6" /> : <PencilSquareIcon className="h-6 w-6" />}
            </button>
            
            <div className="bg-white border-l border-slate-200 w-72 h-auto max-h-[80vh] overflow-y-auto shadow-2xl p-6 rounded-bl-2xl">
                <h3 className="font-bold text-slate-800 text-lg mb-4">Customize Look</h3>
                
                <div className="space-y-3 mb-6">
                    {themes.map(theme => (
                        <button
                            key={theme.name}
                            onClick={() => applyTheme(theme)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${activeTheme === theme.name ? 'border-slate-800 bg-slate-50' : 'border-transparent hover:bg-slate-50'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full shadow-sm" style={{ backgroundColor: theme.primary }}></div>
                                <span className="text-sm font-medium text-slate-700">{theme.name}</span>
                            </div>
                            {activeTheme === theme.name && <CheckCircleIcon className="h-5 w-5 text-slate-800" />}
                        </button>
                    ))}
                </div>
                
                <div className="border-t border-slate-100 pt-4">
                    <h4 className="font-bold text-slate-800 text-sm mb-3">Focus Mode</h4>
                    <button 
                        onClick={toggleZenMode}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${zenMode ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                        <div className="flex items-center gap-2">
                            <EyeIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">Zen Mode</span>
                        </div>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${zenMode ? 'bg-green-500' : 'bg-slate-300'}`}>
                            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${zenMode ? 'left-6' : 'left-1'}`}></div>
                        </div>
                    </button>
                    <p className="text-xs text-slate-400 mt-2">
                        Hides decorative elements for better performance and focus.
                    </p>
                </div>
            </div>
        </div>
    );
};
