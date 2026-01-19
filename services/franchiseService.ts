import { Franchise, LocationType } from '../types';
import { INSTITUTIONS_BY_STATE } from '../config/institutions';

let franchises: Franchise[] = [];

const generateFranchiseData = () => {
    const allInstitutions: Franchise[] = [];
    let idCounter = 1;

    for (const state in INSTITUTIONS_BY_STATE) {
        const institutionTypes = INSTITUTIONS_BY_STATE[state];
        for (const type in institutionTypes) {
            const typeEnum = type as LocationType;
            const institutions = institutionTypes[typeEnum];

            if (typeEnum === LocationType.School) {
                const schoolBoards = institutions as { [board: string]: string[] };
                for (const board in schoolBoards) {
                    schoolBoards[board].forEach(name => {
                        allInstitutions.push({
                            id: `FRAN-${idCounter++}`,
                            name: `${name}, ${state}`,
                            type: typeEnum,
                            studentCount: Math.floor(500 + Math.random() * 2500),
                            revenue: Math.floor(5000000 + Math.random() * 20000000),
                        });
                    });
                }
            } else {
                const otherInstitutions = institutions as string[];
                otherInstitutions.forEach(name => {
                    allInstitutions.push({
                        id: `FRAN-${idCounter++}`,
                        name: `${name}, ${state}`,
                        type: typeEnum,
                        studentCount: Math.floor(1000 + Math.random() * 10000),
                        revenue: Math.floor(10000000 + Math.random() * 50000000),
                    });
                });
            }
        }
    }
    return allInstitutions;
};

franchises = generateFranchiseData();

export const franchiseService = {
    getFranchises: (): Franchise[] => {
        return franchises;
    },
    getFranchiseById: (id: string): Franchise | undefined => {
        return franchises.find(f => f.id === id);
    },
};
