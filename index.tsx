
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ToastProvider } from './hooks/useToast';
import { AppConfigProvider } from './contexts/AppConfigContext';
import { ClassroomProvider } from './contexts/ClassroomContext';
import { LanguageProvider } from './contexts/LanguageContext';

// FORCE CACHE CLEAR: v4.3.0-FIX-RESOLVE
const VERSION = '4.3.0-FIX-RESOLVE';

async function clearOldSystemCache() {
    const current = localStorage.getItem('sarthi_version_tag');
    if (current !== VERSION) {
        console.warn("Resolving Module Errors... Cleaning Cache.");
        if ('caches' in window) {
            const names = await caches.keys();
            for (let name of names) await caches.delete(name);
        }
        localStorage.clear(); // Complete reset to fix alias issues
        localStorage.setItem('sarthi_version_tag', VERSION);
        window.location.reload();
        return true;
    }
    return false;
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    const start = () => {
        root.render(
            <React.StrictMode>
                <LanguageProvider>
                    <ToastProvider>
                        <AppConfigProvider>
                            <ClassroomProvider>
                                <App />
                            </ClassroomProvider>
                        </AppConfigProvider>
                    </ToastProvider>
                </LanguageProvider>
            </React.StrictMode>
        );
    };

    clearOldSystemCache().then(reloaded => {
        if (!reloaded) start();
    }).catch(() => start());
}
