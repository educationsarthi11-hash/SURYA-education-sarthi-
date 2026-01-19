import { LocationType } from '../types';

// विस्तृत मैपिंग: भारत के राज्य और दुनिया के देश
export const stateBoardMapping: { [key: string]: string[] } = {
    "Delhi": ["CBSE", "ICSE", "NIOS", "DBSE (Delhi Board)", "GGSIPU Admission"],
    "Haryana": ["HBSE (BSEH)", "CBSE", "NIOS", "KUK Entrance", "MDU Admission"],
    "Uttar Pradesh": ["UPMSP (UP Board)", "CBSE", "ICSE", "AKTU Admission"],
    "Rajasthan": ["RBSE", "CBSE", "ICSE", "RU Admission"],
    "Maharashtra": ["MSBSHSE (SSC/HSC)", "ICSE", "CBSE", "MU Admission"],
    "USA": ["American High School (K-12)", "IB Diploma", "Common Core", "SAT Prep"],
    "UK": ["GCSE", "A-Levels", "Cambridge International", "UCAS Application"],
    "UAE": ["KHDA Approved", "Ministry of Education (MOE)", "CBSE International"],
    "Canada": ["Ontario (OSSD)", "British Columbia (BCC)", "Alberta Diploma"],
    "International / Global": ["IB Diploma", "Cambridge IGCSE/A-Levels", "American AP", "Global IELTS/SAT"],
    "Other State": ["CBSE", "ICSE", "Regional State Board", "NIOS"]
};

export const getBoardsForType = (type: LocationType, location: string = "Delhi"): string[] => {
    const boards = stateBoardMapping[location] || stateBoardMapping["International / Global"];
    
    switch (type) {
        case LocationType.School:
            return boards;
        case LocationType.CoachingCenter:
            return ["UPSC (IAS/IPS)", "JEE Mains & Advanced", "NEET (Medical)", "SSC CGL/CHSL", "Banking (IBPS/SBI)", "Defence (NDA/CDS)", "State PSC", "TET/CTET", "IELTS/PTE", "CLAT (Law)"];
        case LocationType.College:
        case LocationType.University:
            return ["University Admission Test", "UG - Professional", "PG - Academic", "Post-Doctoral Fellowship", "Ph.D. Entrance", "NET/SET Exams"];
        case LocationType.ITI:
        case LocationType.TechnicalInstitute:
            return ["NCVT (National)", "SCVT (State)", "Skill India Certification", "Foreign Technical Diploma"];
        default:
            return ["Global Educational Standards"];
    }
};

// पूर्ण कोर्स कैटलॉग - महा डेटाबेस (PhD सहित)
export const courseCatalog: { [key in LocationType]?: string[] } = {
    [LocationType.School]: [
        'Pre-Nursery / Play Group', 'Nursery', 'LKG', 'UKG', 
        'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
        'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
        'Class 11 - PCM (Non-Medical)', 'Class 11 - PCB (Medical)', 'Class 11 - Commerce with Math', 'Class 11 - Arts / Humanities',
        'Class 12 - PCM (Non-Medical)', 'Class 12 - PCB (Medical)', 'Class 12 - Commerce with Math', 'Class 12 - Arts / Humanities'
    ],
    [LocationType.University]: [
        'Ph.D. (Doctor of Philosophy - All Streams)', 'Post-Doctoral Research Fellowship', 
        'M.Phil. (Masters of Philosophy)', 'D.Sc. (Doctor of Science)', 'D.Litt. (Doctor of Letters)',
        'M.A. (Masters in Arts - All Subjects)', 'M.Sc. (Masters in Science - All Subjects)', 
        'M.Com. (Masters in Commerce)', 'M.B.A. (Masters in Business Administration)', 
        'M.Tech (Masters in Engineering)', 'M.C.A. (Masters in Computer Applications)', 
        'M.Ed. (Masters in Education)', 'L.L.M. (Masters of Law)', 'M.P.H. (Masters in Public Health)',
        'M.S. (Specialized Research)', 'M.S.W. (Social Work)'
    ],
    [LocationType.College]: [
        'B.A. (Bachelor of Arts)', 'B.Sc. (Bachelor of Science)', 'B.Com. (Bachelor of Commerce)', 
        'B.Tech / B.E. (Engineering)', 'B.C.A. (Computer Applications)', 'B.B.A. (Business Administration)', 
        'B.Ed. (Education)', 'L.L.B. (3 Year / 5 Year Integrated Law)', 'B.Arch (Architecture)', 
        'B.J.M.C. (Journalism)', 'B.Voc. (Vocational Studies)', 'B.P.Ed (Physical Education)'
    ],
    [LocationType.CoachingCenter]: [
        'UPSC Civil Services (IAS/IPS/IFS)', 'State PCS (HCS, RAS, UPPSC)', 'JEE Mains & Advanced', 'NEET-UG (Medical)', 
        'SSC CGL / CHSL / MTS', 'IBPS / SBI Bank PO & Clerk', 'NDA / CDS / AFCAT (Defence)', 
        'UGC NET / JRF (Assistant Professor)', 'GATE (Engineering Graduate)', 'CAT / MAT / CMAT (MBA Entrance)',
        'IELTS / TOEFL / PTE (Study Abroad)', 'CLAT / AILET (Law Entrance)', 'CTET / State TET (Teaching Job)'
    ],
    [LocationType.Medical]: [
        'M.B.B.S. (Medicine & Surgery)', 'B.D.S. (Dental)', 'B.A.M.S. (Ayurveda)', 'B.H.M.S. (Homeopathy)', 
        'B.Pharma (Pharmacy)', 'D.Pharma (Diploma)', 'B.Sc. Nursing', 'General Nursing (GNM/ANM)', 
        'B.P.T. (Physiotherapy)', 'Medical Lab Tech (DMLT/BMLT)', 'MD / MS (Specialized)'
    ],
    [LocationType.ITI]: [
        'Electrician Trade', 'Fitter Trade', 'Turner Trade', 'Welder (Gas & Electric)', 
        'COPA (Computer Operator)', 'Diesel Mechanic', 'Motor Vehicle Mechanic', 
        'Stenography (Hindi/English)', 'Draughtsman (Civil/Mech)', 'Plumber', 'Wireman', 'Tool & Die Maker'
    ],
    [LocationType.TechnicalInstitute]: [
        'Full Stack Development (MERN/Java)', 'AI, ML & Data Science Specialists', 'Cyber Security & Ethical Hacking', 
        'Cloud Computing (AWS/Azure/GCP)', 'Digital Marketing & SEO', 'Tally Prime & GST Professional', 
        'AutoCAD / SolidWorks Design', 'Mobile App Development (Android/iOS)', 'UI/UX Design Masterclass'
    ],
    [LocationType.ComputerCenter]: [
        'ADCA (Advanced Diploma)', 'DCA (Basic Computer)', 'CCC (NIELIT)', 
        'Hardware & Networking', 'Graphic Designing (PS/AI)', 'Video Editing (Premiere Pro)', 
        'Office Management', 'Hindi/English Typing'
    ]
};

export const allLevels = Object.values(courseCatalog).flat();

export const getDefaultClassesForType = (type: LocationType): string[] => {
    return courseCatalog[type] || ['General Academic Path'];
};

export const bookData: { [className: string]: { [board: string]: { [company: string]: string[] } } } = {
    'Class 10': {
        'CBSE': { 'NCERT': ['Science', 'Mathematics', 'English', 'History'] }
    },
    'Nursery': {
        'General': { 'Standard': ['Alphabet Fun', 'Number Magic', 'Drawing Book'] }
    }
};

export const bookChapterMap: { [bookName: string]: string[] } = {
    "NCERT Science": ["Ch 1: Chemical Reactions", "Ch 2: Acids, Bases", "Ch 3: Metals", "Ch 4: Life Processes"]
};

export const getSubjectsForClass = (className: string) => {
    if (className.includes('Science') || className.includes('Medical')) return [
        { name: 'Physics', hindi: 'भौतिक विज्ञान', icon: 'BoltIcon' },
        { name: 'Chemistry', hindi: 'रसायन विज्ञान', icon: 'BeakerIcon' },
        { name: 'Mathematics', hindi: 'गणित', icon: 'CalculatorIcon' },
        { name: 'Biology', hindi: 'जीव विज्ञान', icon: 'HeartIcon' }
    ];
    if (className.includes('Ph.D.')) return [
        { name: 'Research Methodology', hindi: 'अनुसंधान पद्धति', icon: 'MagnifyingGlassIcon' },
        { name: 'Literature Review', hindi: 'साहित्य समीक्षा', icon: 'BookOpenIcon' },
        { name: 'Thesis Writing', hindi: 'शोध प्रबंध लेखन', icon: 'DocumentTextIcon' },
        { name: 'Data Analysis', hindi: 'डेटा विश्लेषण', icon: 'ChartBarIcon' }
    ];
    if (className.includes('Commerce')) return [
        { name: 'Accountancy', hindi: 'लेखाशास्त्र', icon: 'BanknotesIcon' },
        { name: 'Business Studies', hindi: 'व्यवसाय अध्ययन', icon: 'BriefcaseIcon' },
        { name: 'Economics', hindi: 'अर्थशास्त्र', icon: 'ChartBarIcon' }
    ];
    
    return [
        { name: 'Mathematics', hindi: 'गणित', icon: 'CalculatorIcon' },
        { name: 'Science', hindi: 'विज्ञान', icon: 'BeakerIcon' },
        { name: 'English', hindi: 'अंग्रेजी', icon: 'BookOpenIcon' }
    ];
};

export const boardsAndExamsList = [
    "UPSC Civil Services",
    "JEE Mains & Advanced",
    "NEET-UG (Medical Entrance)",
    "SSC CGL / CHSL",
    "IBPS / SBI Bank PO & Clerk",
    "NDA / CDS (Defence)",
    "CLAT (Law Entrance)",
    "Ph.D. Entrance",
    "GATE (Engineering Graduate)",
    "UGC NET / JRF (Academic)",
    "CSIR NET",
    "CTET / State TET (Teaching)"
];

export const standardBookSets: { [key: string]: string[] } = {
    "School-CBSE-Class-10": ["NCERT Science", "NCERT Mathematics", "First Flight (English)", "Footprints Without Feet"],
    "School-HBSE (BSEH)-Class-10": ["HBSE Science", "HBSE Mathematics", "English Reader"],
    "ITI-NCVT (National)-Class-10": ["Electrician Trade Theory", "Workshop Calculation & Science", "Engineering Drawing"],
    "University-NET/SET Exams-Ph.D. Entrance": ["Research Aptitude Guide", "Subject Specific Paper 1", "Case Study Analysis"],
};