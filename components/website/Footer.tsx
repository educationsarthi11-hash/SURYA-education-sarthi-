
import React from 'react';
import { EduSarthiLogo, EnvelopeIcon, MapPinIcon, PhoneIcon } from '../icons/AllIcons';
import GuestAssistant from './GuestAssistant';

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <li>
        <a href={href} className="text-slate-400 hover:text-primary transition-colors text-sm">
            {children}
        </a>
    </li>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800 relative">
            <GuestAssistant />
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand Column with Animated Logo */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="scale-75 -ml-4">
                                <EduSarthiLogo />
                            </div>
                            <span className="text-xl font-bold tracking-tight uppercase -ml-2">Sarthi Eco System</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed font-hindi">
                            Empowering Mangmat with an AI-driven educational eco-system. From admission to employment, we are your partners in growth.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <MapPinIcon className="h-4 w-4 text-orange-500"/>
                                <span>Mangmat Campus, Haryana, India</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <PhoneIcon className="h-4 w-4 text-orange-500"/>
                                <a href="tel:919053144592" className="hover:text-primary transition-colors">+91 90531 44592</a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs opacity-50">Platform</h4>
                        <ul className="space-y-3">
                            <FooterLink href="#features">AI Features</FooterLink>
                            <FooterLink href="#services">Course Mapping</FooterLink>
                            <FooterLink href="#pricing">No Cost Plans</FooterLink>
                            <FooterLink href="#roadmap">Future Roadmap</FooterLink>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs opacity-50">Support</h4>
                        <ul className="space-y-3">
                            <FooterLink href="#">Help Center</FooterLink>
                            <FooterLink href="#">Privacy Policy</FooterLink>
                            <FooterLink href="#">Terms of Service</FooterLink>
                            <FooterLink href="#contact">Contact Us</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs opacity-50">Stay Updated</h4>
                        <p className="text-slate-400 text-sm mb-4">Get the latest AI education trends from Mangmat.</p>
                        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent placeholder-slate-500"
                            />
                            <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-lg text-sm transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">
                        &copy; {new Date().getFullYear()} Education Sarthi Eco System, Mangmat. Made with ❤️ in India.
                    </p>
                    <div className="flex items-center gap-4">
                         <p className="text-slate-600 text-xs font-hindi">
                            शिक्षा से रोजगार तक का सफर
                        </p>
                        <span className="bg-white/10 px-2 py-1 rounded text-[10px] text-slate-400">v3.0-EcoSystem</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
