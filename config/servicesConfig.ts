
import React from 'react';
import { UserRole, ServiceName, ServiceCategory, LocationType, Service } from '../types';
import * as Icons from '../components/icons/AllIcons';

const AITutor = React.lazy(() => import('../components/AITutor'));
const AIStudyGuru = React.lazy(() => import('../components/SmartLibrary'));
const AiVirtualLab = React.lazy(() => import('../components/AiVirtualLab'));
const AdmissionForm = React.lazy(() => import('../components/AdmissionForm'));
const PlacementForum = React.lazy(() => import('../components/PlacementForum'));
const StudentDatabase = React.lazy(() => import('../components/StudentDatabase'));
const FeeManagement = React.lazy(() => import('../components/FeeManagement'));
const AttendanceLog = React.lazy(() => import('../components/AttendanceLog'));
const FaceAttendance = React.lazy(() => import('../components/FaceAttendance'));
const QrAttendance = React.lazy(() => import('../components/QrAttendance'));
const AIHomeworkHub = React.lazy(() => import('../components/AIHomeworkHub'));
const AnalyticsDashboard = React.lazy(() => import('../components/AnalyticsDashboard'));
const ChangePassword = React.lazy(() => import('../components/ChangePassword'));
const FranchiseConfigurator = React.lazy(() => import('../components/FranchiseConfigurator'));
const DigitalNoticeBoard = React.lazy(() => import('../components/DigitalNoticeBoard'));
const SmartProxyManager = React.lazy(() => import('../components/SmartProxyManager'));
const AITeacherEvaluator = React.lazy(() => import('../components/AITeacherEvaluator'));
const RecruitmentPrepGuru = React.lazy(() => import('../components/RecruitmentPrepGuru'));
const MedicalGuru = React.lazy(() => import('../components/MedicalGuru'));
const ITIGuru = React.lazy(() => import('../components/ITIGuru'));
const AIAnatomyLab = React.lazy(() => import('../components/AIAnatomyLab'));
const AIMachineWorkshop = React.lazy(() => import('../components/AIMachineWorkshop'));
const Classroom = React.lazy(() => import('../components/Classroom'));
const EduReels = React.lazy(() => import('../components/EduReels'));
const AiAssistant = React.lazy(() => import('../components/AiAssistant'));
const AIAdGenerator = React.lazy(() => import('../components/AIAdGenerator'));
const CVGenerator = React.lazy(() => import('../components/CVGenerator'));
const OnlineExam = React.lazy(() => import('../components/OnlineExam'));
const ProgressMonitor = React.lazy(() => import('../components/ProgressMonitor'));
const SchoolStore = React.lazy(() => import('../components/SchoolStore'));
const SmartCanteen = React.lazy(() => import('../components/SmartCanteen'));
const TestGuru = React.lazy(() => import('../components/TestGuru'));
const VideoGenerator = React.lazy(() => import('../components/VideoGenerator'));
const WorldMap = React.lazy(() => import('../components/WorldMap'));
const NearbySchoolFinder = React.lazy(() => import('../components/NearbySchoolFinder'));
const FranchisePlans = React.lazy(() => import('../components/FranchisePlans'));
const FranchiseSupport = React.lazy(() => import('../components/FranchiseSupport'));
const FeeNotification = React.lazy(() => import('../components/FeeNotification'));
const CertificateGenerator = React.lazy(() => import('../components/CertificateGenerator'));
const Leaderboard = React.lazy(() => import('../components/Leaderboard'));
const WellnessGuru = React.lazy(() => import('../components/WellnessGuru'));
const Interactive3DLab = React.lazy(() => import('../components/Interactive3DLab'));
const PersonalizedLearningPath = React.lazy(() => import('../components/PersonalizedLearningPath'));
const AutomatedTimetableGenerator = React.lazy(() => import('../components/AutomatedTimetableGenerator'));
const SkillMarketplace = React.lazy(() => import('../components/SkillMarketplace'));
const SportsHub = React.lazy(() => import('../components/SportsHub'));
const AIInterviewCoach = React.lazy(() => import('../components/AIInterviewCoach'));
const LegalGuidelines = React.lazy(() => import('../components/LegalGuidelines'));
const SocialMediaAdGenerator = React.lazy(() => import('../components/SocialMediaVideoGenerator'));
const SmartDesignStudio = React.lazy(() => import('../components/SmartDesignStudio'));
const AISarkariJobGuru = React.lazy(() => import('../components/AISarkariJobGuru'));
const NgoConnect = React.lazy(() => import('../components/NgoConnect'));
const AutoDialer = React.lazy(() => import('../components/AutoDialer'));
const AlumniConnect = React.lazy(() => import('../components/AlumniConnect'));
const AIDebateCoach = React.lazy(() => import('../components/AIDebateCoach'));
const CareerSimulator = React.lazy(() => import('../components/CareerSimulator'));
const AICodeLab = React.lazy(() => import('../components/AICodeLab'));
const DailyNews = React.lazy(() => import('../components/DailyNews'));
const AILanguageLab = React.lazy(() => import('../components/AILanguageLab'));
const SmartNoteMaker = React.lazy(() => import('../components/SmartNoteMaker'));
const VoiceMemo = React.lazy(() => import('../components/VoiceMemo'));
const AIFlashcards = React.lazy(() => import('../components/AIFlashcards'));
const LostAndFound = React.lazy(() => import('../components/LostAndFound'));
const VideoGuide = React.lazy(() => import('../components/VideoGuide'));
const SmartLibrary = React.lazy(() => import('../components/SmartLibrary'));
const ResultPortal = React.lazy(() => import('../components/ResultPortal'));
const VisitorManagement = React.lazy(() => import('../components/VisitorManagement'));
const CampusMessenger = React.lazy(() => import('../components/CampusMessenger'));
const InventoryManager = React.lazy(() => import('../components/InventoryManager'));
const SmartCampusCalendar = React.lazy(() => import('../components/SmartCalendar'));
const DigitalLocker = React.lazy(() => import('../components/DigitalLocker'));
const InfirmaryManagement = React.lazy(() => import('../components/InfirmaryManagement'));
const CampusVoting = React.lazy(() => import('../components/CampusVoting'));
const QuizArena = React.lazy(() => import('../components/QuizArena'));
const FocusZone = React.lazy(() => import('../components/FocusZone'));
const CampusRadio = React.lazy(() => import('../components/CampusRadio'));
const AIAstroGuru = React.lazy(() => import('../components/AIAstroGuru'));
const AIFinanceGuru = React.lazy(() => import('../components/AIFinanceGuru'));
const AICyberSmart = React.lazy(() => import('../components/AICyberSmart'));
const GrievancePortal = React.lazy(() => import('../components/GrievancePortal'));
const AlumniDonation = React.lazy(() => import('../components/AlumniDonation'));
const PsychometricTest = React.lazy(() => import('../components/PsychometricTest'));
const MessManagement = React.lazy(() => import('../components/MessManagement'));
const SmartDigitalDiary = React.lazy(() => import('../components/SmartDigitalDiary'));
const AIWebsiteBuilder = React.lazy(() => import('../components/AIWebsiteBuilder'));
const ProfitCalculator = React.lazy(() => import('../components/ProfitCalculator'));
const LeadGenerator = React.lazy(() => import('../components/LeadGenerator'));
const AIChemistryLab = React.lazy(() => import('../components/AIChemistryLab'));
const SpiritualWellnessHub = React.lazy(() => import('../components/SpiritualWellnessHub'));
const SmartTransport = React.lazy(() => import('../components/SmartTransport'));
const SmartHRManager = React.lazy(() => import('../components/SmartHR'));
const VedicMathLab = React.lazy(() => import('../components/VedicMathLab'));
const AIGallery = React.lazy(() => import('../components/AIGallery'));
const SyllabusTracker = React.lazy(() => import('../components/SyllabusTracker'));
const AIMakerLab = React.lazy(() => import('../components/AIMakerLab'));
const AIElectricLab = React.lazy(() => import('../components/AIElectricLab'));
const AIAgricultureLab = React.lazy(() => import('../components/AIAgricultureLab'));
const HandwritingCoach = React.lazy(() => import('../components/HandwritingCoach'));
const HostelManagement = React.lazy(() => import('../components/HostelManagement'));
const SmartWhiteboard = React.lazy(() => import('../components/SmartWhiteboard'));
const ParentConnect = React.lazy(() => import('../components/ParentPortal'));
const LessonPlanner = React.lazy(() => import('../components/CurriculumArchitect'));
const CareerPredictor = React.lazy(() => import('../components/CareerPredictor'));
const ParentCoach = React.lazy(() => import('../components/ParentCoach'));
const StudentIncubator = React.lazy(() => import('../components/StudentIncubator'));
const AIParentVoiceHub = React.lazy(() => import('../components/AIParentVoiceHub'));

export const ALL_SERVICES: Service[] = [
  { name: 'AI Tutor', description: 'Personalized AI learning assistant.', icon: React.createElement(Icons.AcademicCapIcon), roles: [UserRole.Student], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'AI Study Guru', description: 'Advanced AI research and study companion.', icon: React.createElement(Icons.BookOpenIcon), roles: [UserRole.Student], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'AI Virtual Lab', description: 'Interactive AI-powered science experiments.', icon: React.createElement(Icons.BeakerIcon), roles: [UserRole.Student], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Smart Admissions', description: 'AI-powered document parsing and admission.', icon: React.createElement(Icons.UserPlusIcon), roles: [UserRole.Admin, UserRole.School], category: ServiceCategory.ADMINISTRATION },
  { name: 'Placement Forum', description: 'Connect students with top hiring companies.', icon: React.createElement(Icons.BriefcaseIcon), roles: [UserRole.Student, UserRole.Company, UserRole.College, UserRole.University], category: ServiceCategory.CAREER_DEVELOPMENT },
  { name: 'Student Database', description: 'Manage comprehensive student records.', icon: React.createElement(Icons.UsersIcon), roles: [UserRole.Admin, UserRole.School, UserRole.College], category: ServiceCategory.ADMINISTRATION },
  { name: 'Fee Management', description: 'Automated fee collection and reporting.', icon: React.createElement(Icons.CurrencyRupeeIcon), roles: [UserRole.Admin, UserRole.Parent, UserRole.Student, UserRole.School], category: ServiceCategory.ADMINISTRATION },
  { name: 'Attendance Log', description: 'Track daily attendance records.', icon: React.createElement(Icons.CheckCircleIcon), roles: [UserRole.Admin, UserRole.Teacher, UserRole.School], category: ServiceCategory.ADMINISTRATION },
  { name: 'Face Attendance', description: 'AI face recognition attendance.', icon: Icons.CameraIcon ? React.createElement(Icons.CameraIcon) : null, roles: [UserRole.Admin, UserRole.Teacher, UserRole.School], category: ServiceCategory.ADMINISTRATION },
  { name: 'QR Attendance', description: 'Offline-first QR based attendance.', icon: React.createElement(Icons.QrCodeIcon), roles: [UserRole.Teacher, UserRole.Admin], category: ServiceCategory.ADMINISTRATION },
  { name: 'AI Homework Hub', description: 'Automated homework assigning and AI check.', icon: React.createElement(Icons.ClipboardIcon), roles: [UserRole.Teacher, UserRole.Student], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Analytics Dashboard', description: 'Overall institutional performance data.', icon: React.createElement(Icons.ChartBarIcon), roles: [UserRole.Admin, UserRole.School, UserRole.University], category: ServiceCategory.ADMINISTRATION },
  { name: 'Change Password', description: 'Update your account security.', icon: React.createElement(Icons.KeyIcon), roles: Object.values(UserRole), category: ServiceCategory.ADMINISTRATION },
  { name: 'Franchise Configurator', description: 'Setup and brand your institution.', icon: React.createElement(Icons.Cog6ToothIcon), roles: [UserRole.Admin, UserRole.Company], category: ServiceCategory.ADMINISTRATION },
  { name: 'Digital Notice Board', description: 'Publish important alerts and events.', icon: React.createElement(Icons.BellIcon), roles: Object.values(UserRole), category: ServiceCategory.CAMPUS_LIFE },
  { name: 'Smart Proxy Manager', description: 'Automated teacher substitution plan.', icon: React.createElement(Icons.UserGroupIcon), roles: [UserRole.Admin, UserRole.School], category: ServiceCategory.ADMINISTRATION },
  { name: 'AI Teacher Evaluator', description: 'Analyze teaching performance with AI.', icon: React.createElement(Icons.TrophyIcon), roles: [UserRole.Admin, UserRole.School], category: ServiceCategory.ADMINISTRATION },
  { name: 'Recruitment Prep Guru', description: 'AI preparation for competitive exams.', icon: React.createElement(Icons.BriefcaseIcon), roles: [UserRole.Student, UserRole.JobSeeker], category: ServiceCategory.CAREER_DEVELOPMENT },
  { name: 'AI Medical Guru', description: 'Advanced AI help for medical studies.', icon: React.createElement(Icons.HeartIcon), roles: [UserRole.Student, UserRole.Medical], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'AI ITI Guru', description: 'AI guidance for technical trades.', icon: React.createElement(Icons.WrenchScrewdriverIcon), roles: [UserRole.Student, UserRole.ITI], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'AI Anatomy Lab', description: 'Virtual AI human anatomy explorer.', icon: React.createElement(Icons.HeartIcon), roles: [UserRole.Student, UserRole.Medical], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'AI Machine Workshop', description: 'Simulate mechanical and ITI machines.', icon: React.createElement(Icons.WrenchScrewdriverIcon), roles: [UserRole.Student, UserRole.ITI], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Classroom', description: 'Interactive AI Live Learning studio.', icon: React.createElement(Icons.AcademicCapIcon), roles: [UserRole.Student, UserRole.Teacher], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'EduReels', description: 'Learn complex topics in 60 seconds.', icon: React.createElement(Icons.VideoCameraIcon), roles: [UserRole.Student, UserRole.Teacher], category: ServiceCategory.CREATIVE_STUDIO },
  { name: 'AI Staff Assistant', description: 'AI helper for faculty admin tasks.', icon: React.createElement(Icons.SparklesIcon), roles: [UserRole.Teacher, UserRole.Admin], category: ServiceCategory.ADMINISTRATION },
  { name: 'AI Ad Generator', description: 'Create branded marketing materials.', icon: React.createElement(Icons.MegaphoneIcon), roles: [UserRole.Admin, UserRole.School], category: ServiceCategory.CREATIVE_STUDIO },
  { name: 'CV Generator', description: 'AI-crafted high impact resumes.', icon: React.createElement(Icons.DocumentTextIcon), roles: [UserRole.Student, UserRole.JobSeeker], category: ServiceCategory.CAREER_DEVELOPMENT },
  { name: 'Online Exam', description: 'Secure exams with AI proctoring.', icon: React.createElement(Icons.PencilSquareIcon), roles: [UserRole.Student, UserRole.Teacher, UserRole.School], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Progress Monitor', description: 'Comprehensive student progress tracking.', icon: React.createElement(Icons.ArrowTrendingUpIcon), roles: [UserRole.Parent, UserRole.Student, UserRole.Teacher], category: ServiceCategory.ADMINISTRATION },
  { name: 'Campus Kart', description: 'School uniform and essentials store.', icon: React.createElement(Icons.ShoppingCartIcon), roles: [UserRole.Student, UserRole.Parent], category: ServiceCategory.CAMPUS_LIFE },
  { name: 'Smart Canteen', description: 'Pre-order canteen food and skip lines.', icon: Icons.UtensilsIcon ? React.createElement(Icons.UtensilsIcon) : null, roles: [UserRole.Student, UserRole.Teacher], category: ServiceCategory.CAMPUS_LIFE },
  { name: 'Test Paper Guru', description: 'AI generated printable exam papers.', icon: React.createElement(Icons.PencilSquareIcon), roles: [UserRole.Teacher, UserRole.Admin], category: ServiceCategory.ADMINISTRATION },
  { name: 'Access Control Center', description: 'Manage institution level permissions.', icon: React.createElement(Icons.ShieldCheckIcon), roles: [UserRole.Admin, UserRole.Company], category: ServiceCategory.ADMINISTRATION },
  { name: 'AI Video Generator', description: 'Generate video lessons with Google Veo.', icon: React.createElement(Icons.VideoCameraIcon), roles: [UserRole.Teacher, UserRole.Admin], category: ServiceCategory.CREATIVE_STUDIO },
  { name: 'World Expansion Planner', description: 'Regional mapping for global franchises.', icon: React.createElement(Icons.GlobeAltIcon), roles: [UserRole.Admin, UserRole.Company], category: ServiceCategory.GROWTH_EXPANSION },
  { name: 'Nearby School Finder', description: 'Interactive map to find local institutions.', icon: React.createElement(Icons.MapIcon), roles: [UserRole.Parent, UserRole.Admin], category: ServiceCategory.GROWTH_EXPANSION },
  { name: 'Franchise Plans', description: 'Explore investment and branding tiers.', icon: React.createElement(Icons.CurrencyRupeeIcon), roles: [UserRole.Admin, UserRole.Company], category: ServiceCategory.GROWTH_EXPANSION },
  { name: 'Franchise Support', description: 'Technical assistance for partners.', icon: React.createElement(Icons.ExclamationTriangleIcon), roles: [UserRole.Admin, UserRole.Company], category: ServiceCategory.ADMINISTRATION },
  { name: 'Fee Notification', description: 'Automated reminders and AI calling.', icon: React.createElement(Icons.BellIcon), roles: [UserRole.Admin, UserRole.School], category: ServiceCategory.ADMINISTRATION },
  { name: 'AI Certificate Generator', description: 'Blockchain verified certificates.', icon: React.createElement(Icons.TrophyIcon), roles: [UserRole.Admin, UserRole.School, UserRole.College], category: ServiceCategory.ADMINISTRATION },
  { name: 'Placement Reporting', description: 'Analytics for placement cell stats.', icon: React.createElement(Icons.ChartBarIcon), roles: [UserRole.Admin, UserRole.College, UserRole.University], category: ServiceCategory.CAREER_DEVELOPMENT },
  { name: 'Leaderboard', description: 'Gamified student rank system.', icon: React.createElement(Icons.TrophyIcon), roles: [UserRole.Student], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'AI Wellness Guru', description: 'Empathetic AI support for student stress.', icon: React.createElement(Icons.HeartIcon), roles: [UserRole.Student, UserRole.Parent], category: ServiceCategory.HEALTH_WELLNESS },
  { name: 'Interactive 3D Lab', description: 'Metaverse ready interactive models.', icon: React.createElement(Icons.CubeIcon), roles: [UserRole.Student, UserRole.Teacher], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Personalized Learning Path', description: 'AI generated roadmap for success.', icon: React.createElement(Icons.ArrowTrendingUpIcon), roles: [UserRole.Student, UserRole.Parent], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'AI Proctor for Exams', description: 'Advanced AI monitoring for integrity.', icon: Icons.EyeIcon ? React.createElement(Icons.EyeIcon) : null, roles: [UserRole.Admin, UserRole.Teacher], category: ServiceCategory.ADMINISTRATION },
  { name: 'Automated Timetable Generator', description: 'Conflict-free scheduling with AI.', icon: React.createElement(Icons.CalendarDaysIcon), roles: [UserRole.Admin, UserRole.Teacher, UserRole.School], category: ServiceCategory.ADMINISTRATION },
  { name: 'Skill Marketplace', description: 'Student incubator and project board.', icon: Icons.BuildingStorefrontIcon ? React.createElement(Icons.BuildingStorefrontIcon) : null, roles: [UserRole.Student, UserRole.Company], category: ServiceCategory.CAREER_DEVELOPMENT },
  { name: 'Sports & Games Hub', description: 'Registration and info for school sports.', icon: React.createElement(Icons.TrophyIcon), roles: [UserRole.Student, UserRole.Teacher], category: ServiceCategory.CAMPUS_LIFE },
  { name: 'Classroom Management', description: 'Organize student groups and sections.', icon: React.createElement(Icons.UserGroupIcon), roles: [UserRole.Teacher, UserRole.Admin], category: ServiceCategory.ADMINISTRATION },
  { name: 'AI Interview Coach', description: 'AI simulated job interviews.', icon: React.createElement(Icons.BriefcaseIcon), roles: [UserRole.Student, UserRole.JobSeeker], category: ServiceCategory.CAREER_DEVELOPMENT },
  { name: 'Know Your Rights', description: 'Learn legal rights in simple dialect.', icon: React.createElement(Icons.ShieldCheckIcon), roles: [UserRole.Student, UserRole.Parent], category: ServiceCategory.HEALTH_WELLNESS },
  { name: 'Social Media Ad Generator', description: 'Create promotional videos for reels.', icon: Icons.SignalIcon ? React.createElement(Icons.SignalIcon) : null, roles: [UserRole.Admin, UserRole.School], category: ServiceCategory.CREATIVE_STUDIO },
  { name: 'Smart Design Studio', description: 'AI magic designer for school posters.', icon: React.createElement(Icons.PaintBrushIcon), roles: [UserRole.Teacher, UserRole.Admin], category: ServiceCategory.CREATIVE_STUDIO },
  { name: 'AI Sarkari Job Guru', description: 'Latest government job alerts by AI.', icon: React.createElement(Icons.BriefcaseIcon), roles: [UserRole.JobSeeker, UserRole.Student], category: ServiceCategory.CAREER_DEVELOPMENT },
  { name: 'NGO Connect', description: 'Scholarships and CSR aid for students.', icon: React.createElement(Icons.HeartIcon), roles: [UserRole.Student, UserRole.Parent], category: ServiceCategory.HEALTH_WELLNESS },
  { name: 'Auto-Dialer', description: 'Automated AI voice calls for recovery.', icon: React.createElement(Icons.PhoneIcon), roles: [UserRole.Admin, UserRole.School], category: ServiceCategory.ADMINISTRATION },
  { name: 'Alumni Connect', description: 'Network with previous batch students.', icon: React.createElement(Icons.UsersIcon), roles: [UserRole.Student, UserRole.Admin], category: ServiceCategory.CAREER_DEVELOPMENT },
  { name: 'AI Debate Coach', description: 'Master logic and public speaking.', icon: React.createElement(Icons.ChatBubbleIcon), roles: [UserRole.Student], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Career Simulator', description: 'Live the life of different careers.', icon: React.createElement(Icons.BriefcaseIcon), roles: [UserRole.Student], category: ServiceCategory.CAREER_DEVELOPMENT },
  { name: 'AI Code Lab', description: 'Learn coding and fix errors with AI.', icon: React.createElement(Icons.CodeBracketIcon), roles: [UserRole.Student], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Daily Knowledge Shorts', description: 'Daily 5 knowledge facts in Hinglish.', icon: React.createElement(Icons.GlobeAltIcon), roles: [UserRole.Student, UserRole.Parent], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'AI Language Lab', description: 'Master English with AI roleplays.', icon: React.createElement(Icons.AcademicCapIcon), roles: [UserRole.Student], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Smart Note Maker', description: 'Voice to highly organized study notes.', icon: React.createElement(Icons.DocumentTextIcon), roles: [UserRole.Student, UserRole.Teacher], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Voice Memo', description: 'Record thoughts and sync them later.', icon: React.createElement(Icons.MicrophoneIcon), roles: Object.values(UserRole), category: ServiceCategory.CAMPUS_LIFE },
  { name: 'AI Flashcards', description: 'Memorize fast with AI generated cards.', icon: React.createElement(Icons.RectangleStackIcon), roles: [UserRole.Student], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Lost and Found', description: 'Department to report missing items.', icon: Icons.TagIcon ? React.createElement(Icons.TagIcon) : null, roles: Object.values(UserRole), category: ServiceCategory.CAMPUS_LIFE },
  { name: 'Video Guide', description: 'Tutorials for all platform features.', icon: React.createElement(Icons.VideoCameraIcon), roles: Object.values(UserRole), category: ServiceCategory.CAMPUS_LIFE },
  { name: 'Smart Library', description: 'Digital books with AI reader.', icon: React.createElement(Icons.BookOpenIcon), roles: [UserRole.Student, UserRole.Teacher], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Exam Result Portal', description: 'Check results from all Indian boards.', icon: React.createElement(Icons.GlobeAltIcon), roles: [UserRole.Student, UserRole.Parent], category: ServiceCategory.ADMINISTRATION },
  { name: 'Visitor Management', description: 'Security and digital gate pass.', icon: React.createElement(Icons.IdentificationIcon), roles: [UserRole.Admin, UserRole.School, UserRole.Security], category: ServiceCategory.ADMINISTRATION },
  { name: 'Campus Messenger', description: 'Internal secure communication app.', icon: React.createElement(Icons.ChatBubbleIcon), roles: Object.values(UserRole), category: ServiceCategory.CAMPUS_LIFE },
  { name: 'Inventory Manager', description: 'Manage school stock and assets.', icon: React.createElement(Icons.ArchiveBoxIcon), roles: [UserRole.Admin, UserRole.School], category: ServiceCategory.ADMINISTRATION },
  { name: 'Smart Campus Calendar', description: 'Dynamic events and holiday list.', icon: React.createElement(Icons.CalendarDaysIcon), roles: Object.values(UserRole), category: ServiceCategory.CAMPUS_LIFE },
  { name: 'Digital Locker', description: 'Secure vault for certificates and IDs.', icon: React.createElement(Icons.LockClosedIcon), roles: [UserRole.Student, UserRole.Parent], category: ServiceCategory.ADMINISTRATION },
  { name: 'Infirmary', description: 'Health center and medical records.', icon: React.createElement(Icons.HeartIcon), roles: [UserRole.Admin, UserRole.School, UserRole.Nurse], category: ServiceCategory.CAMPUS_LIFE },
  { name: 'Campus Voting', description: 'Digital student body elections.', icon: React.createElement(Icons.HandRaisedIcon), roles: [UserRole.Student, UserRole.Teacher], category: ServiceCategory.CAMPUS_LIFE },
  { name: 'Quiz Arena', description: 'Gamified battles against AI bot.', icon: React.createElement(Icons.BoltIcon), roles: [UserRole.Student], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Focus Zone', description: 'Concentration tools and ambient sound.', icon: React.createElement(Icons.ClockIcon), roles: [UserRole.Student, UserRole.Teacher], category: ServiceCategory.HEALTH_WELLNESS },
  { name: 'Campus Radio', description: 'Daily school updates in AI voice.', icon: React.createElement(Icons.SpeakerWaveIcon), roles: Object.values(UserRole), category: ServiceCategory.CAMPUS_LIFE },
  { name: 'AI Astro Guru', description: 'Destiny insights and name analysis.', icon: React.createElement(Icons.MoonIcon), roles: [UserRole.Student, UserRole.Parent], category: ServiceCategory.HEALTH_WELLNESS },
  { name: 'AI Finance Guru', description: 'Learn savings and earning skills.', icon: React.createElement(Icons.BanknotesIcon), roles: [UserRole.Student], category: ServiceCategory.CAREER_DEVELOPMENT },
  { name: 'AI Cyber Smart', description: 'Master digital safety and scam detection.', icon: React.createElement(Icons.ShieldCheckIcon), roles: [UserRole.Student, UserRole.Parent], category: ServiceCategory.HEALTH_WELLNESS },
  { name: 'Grievance Portal', description: 'Secure anonymous student complaints.', icon: Icons.ScaleIcon ? React.createElement(Icons.ScaleIcon) : null, roles: [UserRole.Student, UserRole.Admin], category: ServiceCategory.ADMINISTRATION },
  { name: 'Alumni Donation', description: 'Funding portal for school growth.', icon: Icons.GiftIcon ? React.createElement(Icons.GiftIcon) : null, roles: [UserRole.Admin, UserRole.School], category: ServiceCategory.ADMINISTRATION },
  { name: 'Psychometric Test', description: 'AI scientific stream selector.', icon: Icons.BrainIcon ? React.createElement(Icons.BrainIcon) : null, roles: [UserRole.Student], category: ServiceCategory.CAREER_DEVELOPMENT },
  { name: 'Mess Management', description: 'Food feedback and waste tracker.', icon: Icons.UtensilsIcon ? React.createElement(Icons.UtensilsIcon) : null, roles: [UserRole.Student, UserRole.Admin], category: ServiceCategory.CAMPUS_LIFE },
  { name: 'Smart Digital Diary', description: 'Parent-Teacher digital communication.', icon: React.createElement(Icons.BookOpenIcon), roles: [UserRole.Teacher, UserRole.Parent], category: ServiceCategory.CAMPUS_LIFE },
  { name: 'AI Website Builder', description: 'Branded landing page in 60 seconds.', icon: React.createElement(Icons.GlobeAltIcon), roles: [UserRole.Admin, UserRole.Company], category: ServiceCategory.CREATIVE_STUDIO },
  { name: 'Profit Calculator', description: 'Franchise ROI and revenue tracker.', icon: React.createElement(Icons.CalculatorIcon), roles: [UserRole.Admin, UserRole.Company], category: ServiceCategory.ADMINISTRATION },
  { name: 'Lead Generator', description: 'Find potential local student leads.', icon: React.createElement(Icons.UsersIcon), roles: [UserRole.Admin, UserRole.Company], category: ServiceCategory.GROWTH_EXPANSION },
  { name: 'AI Chemistry Lab', description: 'Interactive virtual chemistry reactions.', icon: React.createElement(Icons.FlaskConicalIcon), roles: [UserRole.Student, UserRole.Teacher], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Spiritual Wellness', description: 'Values and meditation guidance.', icon: React.createElement(Icons.HeartIcon), roles: Object.values(UserRole), category: ServiceCategory.HEALTH_WELLNESS },
  { name: 'Smart Transport', description: 'Bus tracking and emergency SOS.', icon: React.createElement(Icons.TruckIcon), roles: [UserRole.Student, UserRole.Parent], category: ServiceCategory.CAMPUS_LIFE },
  { name: 'Smart HR Manager', description: 'Staff payroll and leave system.', icon: React.createElement(Icons.UsersIcon), roles: [UserRole.Admin, UserRole.School], category: ServiceCategory.ADMINISTRATION },
  { name: 'Vedic Math Lab', description: 'Master speed calculation tricks.', icon: React.createElement(Icons.CalculatorIcon), roles: [UserRole.Student], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'AI Gallery', description: 'AI automated school news report.', icon: React.createElement(Icons.PhotoIcon), roles: Object.values(UserRole), category: ServiceCategory.CAMPUS_LIFE },
  { name: 'Syllabus Tracker', description: 'Live progress of course completion.', icon: React.createElement(Icons.BookOpenIcon), roles: [UserRole.Teacher, UserRole.Student, UserRole.Admin], category: ServiceCategory.ADMINISTRATION },
  { name: 'AI Maker Lab', description: 'Learn to build machines step-by-step.', icon: React.createElement(Icons.WrenchScrewdriverIcon), roles: [UserRole.Student, UserRole.ITI], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'AI Electric Lab', description: 'Virtual circuit building simulation.', icon: React.createElement(Icons.BoltIcon), roles: [UserRole.Student, UserRole.ITI], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'AI Agriculture Lab', description: 'Modern farming techniques and tips.', icon: React.createElement(Icons.LeafIcon), roles: [UserRole.Student, UserRole.Farmer], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Handwriting Coach', description: 'AI tips to improve writing skills.', icon: React.createElement(Icons.PencilSquareIcon), roles: [UserRole.Student], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Hostel Management', description: 'Rooms, mess and outpass portal.', icon: React.createElement(Icons.HomeIcon), roles: [UserRole.Student, UserRole.Admin], category: ServiceCategory.CAMPUS_LIFE },
  { name: 'AI Smart Board', description: 'AI handwriting recognition whiteboard.', icon: React.createElement(Icons.PaintBrushIcon), roles: [UserRole.Teacher, UserRole.Student], category: ServiceCategory.LEARN_PRACTICE },
  { name: 'Parent Connect', description: 'Central portal for guardian access.', icon: React.createElement(Icons.UsersIcon), roles: [UserRole.Parent], category: ServiceCategory.ADMINISTRATION },
  { name: 'Lesson Planner', description: 'AI curriculum architect for teachers.', icon: React.createElement(Icons.BookOpenIcon), roles: [UserRole.Teacher, UserRole.Admin], category: ServiceCategory.ADMINISTRATION },
  { name: 'Career Predictor', description: 'AI future path analysis based on skills.', icon: React.createElement(Icons.StarIcon), roles: [UserRole.Student], category: ServiceCategory.CAREER_DEVELOPMENT },
  { name: 'Parent Coach', description: 'AI guidance for parents in local dialects.', icon: React.createElement(Icons.FaceSmileIcon), roles: [UserRole.Parent, UserRole.Student], category: ServiceCategory.HEALTH_WELLNESS },
  { name: 'AI Global Bazaar', description: 'Trade and sell student-made products.', icon: React.createElement(Icons.ShoppingCartIcon), roles: [UserRole.Student, UserRole.Company, UserRole.ITI, UserRole.JobSeeker], category: ServiceCategory.CAREER_DEVELOPMENT },
  { name: 'Solar Study Clock', description: 'Study according to solar energy levels.', icon: React.createElement(Icons.ClockIcon), roles: [UserRole.Student], category: ServiceCategory.HEALTH_WELLNESS },
  { name: 'AI Parent Voice Hub', description: 'Direct audio communication for parents in local dialects.', icon: React.createElement(Icons.MicrophoneIcon), roles: [UserRole.Parent], category: ServiceCategory.HEALTH_WELLNESS },
  { name: 'Safety SOS', description: 'Emergency alert with live location.', icon: React.createElement(Icons.ExclamationTriangleIcon), roles: [UserRole.Student, UserRole.Parent], category: ServiceCategory.CAMPUS_LIFE },
];

export const SERVICE_COMPONENTS: { [key in ServiceName]: React.ComponentType<any> } = {
    'AI Tutor': AITutor,
    'AI Study Guru': AIStudyGuru,
    'AI Virtual Lab': AiVirtualLab,
    'Smart Admissions': AdmissionForm,
    'Placement Forum': PlacementForum,
    'Student Database': StudentDatabase,
    'Fee Management': FeeManagement,
    'Attendance Log': AttendanceLog,
    'Face Attendance': FaceAttendance,
    'QR Attendance': QrAttendance,
    'AI Homework Hub': AIHomeworkHub,
    'Analytics Dashboard': AnalyticsDashboard,
    'Change Password': ChangePassword,
    'Franchise Configurator': FranchiseConfigurator,
    'Digital Notice Board': DigitalNoticeBoard,
    'Smart Proxy Manager': SmartProxyManager,
    'AI Teacher Evaluator': AITeacherEvaluator,
    'Recruitment Prep Guru': RecruitmentPrepGuru,
    'AI Medical Guru': MedicalGuru,
    'AI ITI Guru': ITIGuru,
    'AI Anatomy Lab': AIAnatomyLab,
    'AI Machine Workshop': AIMachineWorkshop,
    'Classroom': Classroom,
    'overview': () => null,
    'EduReels': EduReels,
    'AI Staff Assistant': AiAssistant,
    'AI Ad Generator': AIAdGenerator,
    'CV Generator': CVGenerator,
    'Online Exam': OnlineExam,
    'Progress Monitor': ProgressMonitor,
    'Campus Kart': SchoolStore,
    'Smart Canteen': SmartCanteen,
    'Test Paper Guru': TestGuru,
    'Access Control Center': () => null,
    'AI Video Generator': VideoGenerator,
    'World Expansion Planner': WorldMap,
    'Nearby School Finder': NearbySchoolFinder,
    'Franchise Plans': FranchisePlans,
    'Franchise Support': FranchiseSupport,
    'Fee Notification': FeeNotification,
    'AI Certificate Generator': CertificateGenerator,
    'Placement Reporting': () => null,
    'Leaderboard': Leaderboard,
    'AI Wellness Guru': WellnessGuru,
    'Interactive 3D Lab': Interactive3DLab,
    'Personalized Learning Path': PersonalizedLearningPath,
    'AI Proctor for Exams': () => null,
    'Automated Timetable Generator': AutomatedTimetableGenerator,
    'Skill Marketplace': SkillMarketplace,
    'Sports & Games Hub': SportsHub,
    'Classroom Management': () => null,
    'AI Interview Coach': AIInterviewCoach,
    'Know Your Rights': LegalGuidelines,
    'Social Media Ad Generator': SocialMediaAdGenerator,
    'Smart Design Studio': SmartDesignStudio,
    'AI Sarkari Job Guru': AISarkariJobGuru,
    'NGO Connect': NgoConnect,
    'Auto-Dialer': AutoDialer,
    'Alumni Connect': AlumniConnect,
    'AI Debate Coach': AIDebateCoach,
    'Career Simulator': CareerSimulator,
    'AI Code Lab': AICodeLab,
    'Daily Knowledge Shorts': DailyNews,
    'AI Language Lab': AILanguageLab,
    'Smart Note Maker': SmartNoteMaker,
    'Voice Memo': VoiceMemo,
    'AI Flashcards': AIFlashcards,
    'Lost and Found': LostAndFound,
    'Video Guide': VideoGuide,
    'Smart Library': SmartLibrary,
    'Exam Result Portal': ResultPortal,
    'Visitor Management': VisitorManagement,
    'Campus Messenger': CampusMessenger,
    'Inventory Manager': InventoryManager,
    'Smart Campus Calendar': SmartCampusCalendar,
    'Digital Locker': DigitalLocker,
    'Infirmary': InfirmaryManagement,
    'Campus Voting': CampusVoting,
    'Quiz Arena': QuizArena,
    'Focus Zone': FocusZone,
    'Campus Radio': CampusRadio,
    'AI Astro Guru': AIAstroGuru,
    'AI Finance Guru': AIFinanceGuru,
    'AI Cyber Smart': AICyberSmart,
    'Grievance Portal': GrievancePortal,
    'Alumni Donation': AlumniDonation,
    'Psychometric Test': PsychometricTest,
    'Mess Management': MessManagement,
    'Smart Digital Diary': SmartDigitalDiary,
    'AI Website Builder': AIWebsiteBuilder,
    'Profit Calculator': ProfitCalculator,
    'Lead Generator': LeadGenerator,
    'AI Chemistry Lab': AIChemistryLab,
    'Spiritual Wellness': SpiritualWellnessHub,
    'Smart Transport': SmartTransport,
    'Smart HR Manager': SmartHRManager,
    'Vedic Math Lab': VedicMathLab,
    'AI Gallery': AIGallery,
    'Syllabus Tracker': SyllabusTracker,
    'AI Maker Lab': AIMakerLab,
    'AI Electric Lab': AIElectricLab,
    'AI Agriculture Lab': AIAgricultureLab,
    'Handwriting Coach': HandwritingCoach,
    'Hostel Management': HostelManagement,
    'AI Smart Board': SmartWhiteboard,
    'Parent Connect': () => null,
    'Lesson Planner': LessonPlanner,
    'Career Predictor': CareerPredictor,
    'Parent Coach': ParentCoach,
    'AI Global Bazaar': StudentIncubator,
    'AI Parent Voice Hub': AIParentVoiceHub,
    'Safety SOS': () => null,
    'Job Database': () => null,
    'Talent Scout': () => null,
    'Sync Center': () => null,
    'Solar Study Clock': () => null,
};
