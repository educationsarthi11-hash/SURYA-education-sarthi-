
import React from 'react';
import { ServiceName } from '../types';
import ManagementPanel from './ManagementPanel';

interface Props {
  setActiveService: (service: ServiceName | 'overview') => void;
}

const UniversityManagementPanel: React.FC<Props> = ({ setActiveService }) => {
  const config = {
    panelTitle: "University HQ (विश्वविद्यालय मुख्यालय)",
    sections: [
      {
        title: "Network & Growth (नेटवर्क और विस्तार)",
        services: ['Franchise Configurator', 'Franchise Support', 'Franchise Plans', 'World Expansion Planner', 'Analytics Dashboard'] as ServiceName[]
      },
      {
        title: "Central Services (केंद्रीय सेवाएं)",
        services: ['Digital Locker', 'Grievance Portal', 'Alumni Donation', 'Smart Library', 'Access Control Center'] as ServiceName[]
      },
      {
        title: "Branding & Media (ब्रांडिंग और प्रचार)",
        services: ['Social Media Ad Generator', 'Smart Design Studio', 'AI Video Generator', 'AI Website Builder'] as ServiceName[]
      }
    ]
  };

  return <ManagementPanel config={config} handleServiceSelect={setActiveService} />;
};

export default UniversityManagementPanel;
