
import React from 'react';
import { UserRole, User, ServiceName } from '../types';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import AdminDashboard from './AdminDashboard';
import ParentDashboard from './ParentDashboard';
import CompanyDashboard from './CompanyDashboard';
import ITIDashboard from './ITIDashboard';
import MedicalDashboard from './MedicalDashboard';
import CollegeDashboard from './CollegeDashboard';

interface DashboardProps {
  user: User;
  activeService: ServiceName | 'overview';
  setActiveService: (service: ServiceName | 'overview') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, activeService, setActiveService }) => {
    const commonProps = { user, activeService, setActiveService };

    switch (user.role) {
      case UserRole.Admin:
      case UserRole.School:
        return <AdminDashboard {...commonProps} />;
      case UserRole.College:
      case UserRole.University:
        return <CollegeDashboard {...commonProps} />;
      case UserRole.Student:
      case UserRole.JobSeeker:
      case UserRole.Farmer:
        return <StudentDashboard {...commonProps} />;
      case UserRole.Teacher: 
        return <TeacherDashboard {...commonProps} />;
      case UserRole.Parent: 
        return <ParentDashboard {...commonProps} />;
      case UserRole.Company: 
        return <CompanyDashboard {...commonProps} />;
      case UserRole.ITI:
      case UserRole.TechnicalInstitute:
        return <ITIDashboard {...commonProps} />;
      case UserRole.Medical:
      case UserRole.Nurse:
        return <MedicalDashboard {...commonProps} />;
      default: 
        return <StudentDashboard {...commonProps} />;
    }
};

export default Dashboard;
