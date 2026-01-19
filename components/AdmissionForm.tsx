
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
    CheckCircleIcon, ArrowLeftIcon, PrinterIcon, UserCircleIcon, 
    EduSarthiLogo, SparklesIcon, PhotoIcon, AcademicCapIcon,
    ArrowRightIcon, CameraIcon, WhatsAppIcon, PhoneIcon, ShieldCheckIcon,
    BuildingOfficeIcon, MapPinIcon, CurrencyRupeeIcon, DocumentTextIcon,
    HeartIcon, LeafIcon, SpeakerWaveIcon, EnvelopeIcon, TruckIcon
} from './icons/AllIcons';
import { useToast } from '../hooks/useToast';
import { Type } from '@google/genai';
import Loader from './Loader';
import UnifiedScanner from './UnifiedScanner';
import { franchiseService } from '../services/franchiseService';
import { Franchise, LocationType } from '../types';
import { courseCatalog } from '../config/classroomData';

const AdmissionForm: React.FC = () => {
  const toast = useToast();
  const [franchises, setFranchises] = useState<Franchise[]>([]);
  const [selectedFranchise, setSelectedFranchise] = useState<Franchise | null>(null);
  const [formData, setFormData] = useState<any>({ 
    name: '', 
    dob: '',
    gender: 'Male',
    category: 'General',
    fatherName: '', 
    motherName: '',
    mobileNumber: '', 
    emergencyNumber: '',
    address: '', 
    previousSchool: '',
    selectedCourse: '',
    bloodGroup: 'Not Known',
    aadharNumber: '',
    needsTransport: 'No',
    photo: null, 
    isVerified: false,
    id: '',
  });
  
  const [step, setStep] = useState(-1); 
  const [loading, setLoading] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'done'>('idle');

  useEffect(() => {
    setFranchises(franchiseService.getFranchises());
  }, []);

  const availableCourses = useMemo(() => {
    if (!selectedFranchise) return [];
    return courseCatalog[selectedFranchise.type] || [];
  }, [selectedFranchise]);

  useEffect(() => {
    if (availableCourses.length > 0) {
        setFormData(prev => ({ ...prev, selectedCourse: availableCourses[0] }));
    }
  }, [availableCourses]);

  const handleScanComplete = (result: any) => {
      setFormData({ ...formData, ...result, isVerified: true });
      toast.success("AI ने डेटा सफलतापूर्वक निकाल लिया है!");
      setStep(1);
  };

  const handleSendOTP = () => {
      if(!formData.mobileNumber) { toast.error("कृपया मोबाइल नंबर भरें"); return; }
      if(formData.aadharNumber && formData.aadharNumber.length !== 12) {
          toast.error("आधार नंबर 12 अंकों का होना चाहिए");
          return;
      }
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          setStep(2);
          toast.info(`OTP आपके नंबर ${formData.mobileNumber} पर भेजा गया है (Demo: 1234)`);
      }, 1000);
  };

  const verifyOTP = () => {
      if(otp === '1234') {
          toast.success("नंबर वेरिफाई हो गया!");
          setStep(3);
      } else {
          toast.error("गलत कोड, कृपया दोबारा जांचें।");
      }
  };

  const calculateFee = () => {
      let baseFee = 1500;
      if (formData.category === 'Farmer') baseFee -= 500; 
      if (formData.category === 'SC/ST') baseFee -= 300;
      if (formData.needsTransport === 'Yes') baseFee += 800; // Transport Addon
      return baseFee;
  };

  const handleProcessPayment = () => {
      setPaymentStatus('processing');
      setTimeout(() => {
          setPaymentStatus('done');
          const generatedId = `MGM-${selectedFranchise?.id.split('-')[1] || '001'}-${Math.floor(1000 + Math.random() * 9000)}`;
          setFormData((prev: any) => ({ ...prev, id: generatedId }));
          toast.success("भुगतान सफल! अभिभावक को स्वागत कॉल किया जा रहा है।");
          setStep(5);
      }, 2000);
  };

  return (
    <div className="bg-white p-2 sm:p-4 rounded-[4rem] shadow-soft max-w-5xl mx-auto relative overflow-hidden min-h-[750px] border-4 border-slate-50 font-sans">
        <style>{`
            @media print {
                body * { visibility: hidden; }
                #id-card-to-print, #id-card-to-print * { visibility: visible; }
                #id-card-to-print {
                    position: absolute; left: 50%; top: 50%;
                    transform: translate(-50%, -50%) scale(1.5);
                }
            }
        `}</style>

        {loading && <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center rounded-[3rem]"><Loader message="सार्थी डेटा प्रोसेस कर रहा है..." /></div>}

        {step === -1 && (
            <div className="space-y-10 animate-pop-in py-12 px-10 text-center">
                 <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                    <SparklesIcon className="h-4 w-4" /> Global Hub Network
                </div>
                <h3 className="text-5xl font-black text-slate-950 tracking-tighter uppercase leading-none">Select Hub</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar p-1">
                    {franchises.map(fran => (
                        <button key={fran.id} onClick={() => { setSelectedFranchise(fran); setStep(0); }} className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-100 hover:border-primary transition-all text-left group">
                            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-primary mb-4">{fran.type === LocationType.School ? <BuildingOfficeIcon className="h-6 w-6"/> : <AcademicCapIcon className="h-6 w-6"/>}</div>
                            <h4 className="text-lg font-black text-slate-800 uppercase leading-tight">{fran.name}</h4>
                            <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">{fran.type}</p>
                        </button>
                    ))}
                </div>
            </div>
        )}

        {step === 0 && (
            <div className="space-y-12 animate-pop-in py-16 px-10 text-center">
                <button onClick={() => setStep(-1)} className="absolute top-8 left-8 text-slate-400 hover:text-primary font-bold flex items-center gap-2 uppercase text-xs"><ArrowLeftIcon className="h-4 w-4"/> Back</button>
                <h3 className="text-5xl font-black text-slate-950 tracking-tighter uppercase leading-none">Smart Admission</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <button onClick={() => setIsScannerOpen(true)} className="p-10 border-4 border-dashed border-primary/20 rounded-[3.5rem] bg-primary/5 hover:bg-primary/10 transition-all flex flex-col items-center gap-6 shadow-sm">
                        <CameraIcon className="h-12 w-12 text-primary"/><span className="font-black text-slate-900 text-2xl uppercase font-hindi">AI स्कैन (Aadhaar)</span>
                    </button>
                    <button onClick={() => setStep(1)} className="p-10 border-4 border-slate-100 rounded-[3.5rem] bg-slate-50 hover:bg-white transition-all flex flex-col items-center gap-6 shadow-sm">
                        <ArrowRightIcon className="h-12 w-12 text-slate-300"/><span className="font-black text-slate-900 text-2xl uppercase font-hindi">नया फॉर्म भरें</span>
                    </button>
                </div>
            </div>
        )}

        {step === 1 && (
            <div className="space-y-10 animate-pop-in p-6 sm:p-10">
                <h3 className="text-4xl font-black text-slate-950 uppercase tracking-tighter">Student Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[450px] overflow-y-auto pr-2 custom-scrollbar p-1">
                    <div className="lg:col-span-3"><h4 className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-2">1. Basic Info</h4></div>
                    <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase ml-3">Full Name</label><input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold focus:border-primary outline-none" placeholder="छात्र का नाम" /></div>
                    <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase ml-3">Aadhar Number (आधार)</label><input maxLength={12} value={formData.aadharNumber} onChange={e => setFormData({...formData, aadharNumber: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold focus:border-primary outline-none" placeholder="1234 5678 9012" /></div>
                    <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase ml-3">Select Course</label><select value={formData.selectedCourse} onChange={e => setFormData({...formData, selectedCourse: e.target.value})} className="w-full p-4 bg-indigo-50 border-2 border-indigo-100 rounded-2xl font-black">{availableCourses.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                    
                    <div className="lg:col-span-3 mt-4"><h4 className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-2">2. Contact & Medical</h4></div>
                    <div className="space-y-1"><label className="text-[10px] font-black text-green-600 uppercase ml-3">Mobile No.</label><input value={formData.mobileNumber} onChange={e => setFormData({...formData, mobileNumber: e.target.value})} className="w-full p-4 bg-green-50 border-2 border-green-100 rounded-2xl font-black" placeholder="10 Digit Number" /></div>
                    <div className="space-y-1"><label className="text-[10px] font-black text-red-600 uppercase ml-3">Emergency No.</label><input value={formData.emergencyNumber} onChange={e => setFormData({...formData, emergencyNumber: e.target.value})} className="w-full p-4 bg-red-50 border-2 border-red-100 rounded-2xl font-black" placeholder="वैकल्पिक नंबर" /></div>
                    <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase ml-3">Blood Group</label><select value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold"><option>Not Known</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option></select></div>

                    <div className="lg:col-span-3 mt-4"><h4 className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-2">3. Transport & Extras</h4></div>
                    <div className="space-y-1"><label className="text-[10px] font-black text-blue-600 uppercase ml-3 flex items-center gap-1"><TruckIcon className="h-3 w-3"/> Needs School Bus?</label><select value={formData.needsTransport} onChange={e => setFormData({...formData, needsTransport: e.target.value})} className="w-full p-4 bg-blue-50 border-2 border-blue-100 rounded-2xl font-black"><option value="No">No (खुद आएंगे)</option><option value="Yes">Yes (बस चाहिए - ₹800 extra)</option></select></div>
                    <div className="lg:col-span-2 space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase ml-3">Home Address</label><input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold" /></div>
                </div>
                <button onClick={handleSendOTP} className="w-full py-6 bg-slate-950 text-white font-black rounded-3xl shadow-2xl hover:bg-primary transition-all text-xl uppercase tracking-tighter">NEXT: VERIFY MOBILE <ArrowRightIcon className="h-6 w-6" /></button>
            </div>
        )}

        {step === 2 && (
             <div className="space-y-10 animate-pop-in text-center py-20 px-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 mb-4 shadow-inner"><ShieldCheckIcon className="h-10 w-10"/></div>
                <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Identity Check</h3>
                <p className="text-slate-500 font-hindi text-xl max-w-md">नंबर {formData.mobileNumber} पर भेजे गए कोड को यहाँ लिखें।</p>
                <div className="mt-8 space-y-6 w-full max-w-sm">
                    <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="----" maxLength={4} className="w-full p-6 bg-slate-50 border-4 border-slate-100 rounded-[2rem] text-center text-5xl font-black tracking-[1em] outline-none" />
                    <button onClick={verifyOTP} className="w-full py-6 bg-primary text-white font-black rounded-3xl shadow-xl hover:bg-slate-900 transition-all uppercase tracking-widest text-lg">Verify & Proceed</button>
                </div>
            </div>
        )}

        {step === 3 && (
             <div className="space-y-10 animate-pop-in text-center py-16 px-10">
                <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Student Photo</h3>
                <div className="border-8 border-dashed border-slate-100 p-20 rounded-[5rem] bg-slate-50 group hover:border-primary/30 transition-all cursor-pointer relative" onClick={() => (document.getElementById('photo-upload') as any).click()}>
                    {formData.photo ? <img src={URL.createObjectURL(formData.photo)} className="w-64 h-64 rounded-[3rem] mx-auto object-cover border-8 border-white shadow-2xl rotate-3" alt="Student"/> : <div className="space-y-6"><PhotoIcon className="h-32 w-32 text-slate-200 mx-auto group-hover:scale-110 transition-all"/><p className="text-slate-400 font-black text-2xl font-hindi">फोटो अपलोड करें</p></div>}
                    <input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={e => e.target.files && setFormData({...formData, photo: e.target.files[0]})} />
                </div>
                <button onClick={() => setStep(4)} className="w-full max-w-lg py-5 bg-primary text-white font-black rounded-3xl shadow-xl hover:bg-slate-900 transition-all uppercase tracking-tighter text-xl">Review & Pay Fee</button>
            </div>
        )}

        {step === 4 && (
            <div className="space-y-10 animate-pop-in py-16 px-10 max-w-3xl mx-auto text-center">
                <div className="bg-slate-950 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden border-b-8 border-primary">
                    <CurrencyRupeeIcon className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h4 className="text-3xl font-black uppercase tracking-tighter">Admission Summary</h4>
                    <div className="mt-8 space-y-3 text-left max-w-md mx-auto border-t border-white/10 pt-6">
                        <div className="flex justify-between"><span className="text-slate-400">Student:</span><span className="font-bold">{formData.name}</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">Course:</span><span className="font-bold uppercase text-primary">{formData.selectedCourse}</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">Bus Facility:</span><span className="font-bold">{formData.needsTransport}</span></div>
                        <div className="flex justify-between pt-4 border-t border-white/10 text-2xl font-black text-primary"><span>Total:</span><span>₹{calculateFee()}</span></div>
                    </div>
                </div>
                <button onClick={handleProcessPayment} className="w-full py-6 bg-primary text-white font-black rounded-3xl shadow-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-4 text-2xl uppercase">PAY SECURELY</button>
            </div>
        )}

        {step === 5 && (
            <div className="text-center space-y-12 animate-pop-in py-16 px-10">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner"><CheckCircleIcon className="h-16 w-16"/></div>
                <div className="space-y-4">
                    <h3 className="text-5xl font-black text-slate-950 uppercase tracking-tighter leading-none">Admission Success! 🎉</h3>
                    <p className="text-slate-500 font-hindi text-2xl font-bold">छात्र {formData.name} का दाखिला सफलतापूर्वक हो गया है।</p>
                </div>
                
                <div id="id-card-to-print" className="bg-gradient-to-br from-slate-900 to-indigo-900 p-8 rounded-[3.5rem] text-white w-full max-w-sm mx-auto shadow-2xl text-left relative overflow-hidden border-4 border-white/10">
                    <div className="relative z-10 flex flex-col items-center mb-6 border-b border-white/10 pb-4">
                        <h4 className="font-black text-lg uppercase tracking-widest text-center text-primary">{selectedFranchise?.name}</h4>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em]">Official Digital Identity</p>
                    </div>
                    <div className="flex gap-6 relative z-10">
                        <div className="w-24 h-32 bg-white rounded-2xl overflow-hidden flex-shrink-0 border-4 border-white/20 shadow-2xl">
                            {formData.photo ? <img src={URL.createObjectURL(formData.photo)} className="w-full h-full object-cover" alt="Student"/> : <UserCircleIcon className="w-full h-full text-slate-200"/>}
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="text-2xl font-black leading-none uppercase tracking-tighter mb-1 truncate w-40">{formData.name}</h4>
                            <p className="text-xs font-bold text-primary italic">Verified Student</p>
                            <div className="mt-4 space-y-1 text-[10px]">
                                <div className="flex flex-col"><span className="text-slate-500 uppercase tracking-widest">Student ID</span><span className="font-bold font-mono text-primary">{formData.id}</span></div>
                                <div className="flex flex-col"><span className="text-slate-500 uppercase tracking-widest">Class</span><span className="font-bold uppercase">{formData.selectedCourse}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center relative z-10">
                        <div className="bg-white p-1 rounded-lg"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=${formData.id}`} className="w-8 h-8" alt="QR"/></div>
                        <p className="text-[7px] font-black text-slate-400 uppercase text-right leading-tight">AI Generated <br/> Identity Document.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto no-print">
                    <div className="bg-green-50 p-6 rounded-3xl border-2 border-green-100 flex flex-col items-center text-center">
                        <WhatsAppIcon className="h-10 w-10 text-green-600 mb-3"/>
                        <p className="text-[10px] text-green-600 font-hindi mt-1 font-bold">स्मार्टफोन रसीद भेज दी गई है।</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 flex flex-col items-center text-center">
                        <EnvelopeIcon className="h-10 w-10 text-blue-600 mb-3"/>
                        <p className="text-[10px] text-blue-600 font-hindi mt-1 font-bold">SMS भेज दिया गया है।</p>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-3xl border-2 border-orange-100 flex flex-col items-center text-center animate-pulse">
                        <SpeakerWaveIcon className="h-10 w-10 text-orange-600 mb-3"/>
                        <p className="text-[10px] text-orange-600 font-hindi mt-1 font-bold">स्वागत कॉल किया जा रहा है।</p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 no-print pb-10">
                    <button onClick={() => window.print()} className="flex items-center gap-3 bg-slate-950 text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-primary transition-all text-lg uppercase">
                        <PrinterIcon className="h-6 w-6"/> Print Card & Receipt
                    </button>
                    <button onClick={() => window.location.reload()} className="px-8 py-5 bg-slate-100 text-slate-600 font-black rounded-2xl uppercase text-sm">New Admission</button>
                </div>
            </div>
        )}

        <UnifiedScanner 
            isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} 
            onScanComplete={handleScanComplete}
            prompt={`Extract details from Aadhaar. Return JSON with name, dob, gender, fatherName, address.`}
            title={`Aadhaar AI Magic Scan`}
        />
    </div>
  );
};

export default AdmissionForm;
