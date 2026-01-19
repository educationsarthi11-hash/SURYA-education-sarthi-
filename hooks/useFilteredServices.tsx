
import { useMemo } from 'react';
import { UserRole, Service, LocationType } from '../types';
import { ALL_SERVICES } from '../config/servicesConfig';
import { useAppConfig } from '../contexts/AppConfigContext';

export const useFilteredServices = (userRole: UserRole): Service[] => {
  const { institutionType } = useAppConfig();

  const filteredServices = useMemo(() => {
    return ALL_SERVICES.filter(service => {
        // 1. Role Check: क्या यह टूल इस यूजर के लिए है?
        const roleMatch = service.roles.includes(userRole);
        
        // 2. Institution Check: क्या यह टूल इस संस्था के टाइप के लिए है?
        // अगर institutionTypes लिस्ट खाली है, तो यह 'Universal' टूल है (सबको दिखेगा)।
        const typeMatch = !service.institutionTypes || 
                         service.institutionTypes.length === 0 || 
                         service.institutionTypes.includes(institutionType);

        return roleMatch && typeMatch;
    });
  }, [userRole, institutionType]);

  return filteredServices;
};
