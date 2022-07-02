import { Section } from '@prisma/client';
import { SectionRepository } from 'src/persistance/repository/section.repository';
export declare class SectionService {
    private sectionRepository;
    constructor(sectionRepository: SectionRepository);
    createSection(inputSection: any): Promise<Section>;
    deleteSection(id: string): Promise<boolean>;
    deleteSectionByName(name: string): Promise<boolean>;
    getOne(id: string): Promise<Section>;
    getAll(): Promise<Section[]>;
    findByValue(name: string): Promise<Section[]>;
    updateSection(sectionId: string, sectionForUpdate: any): Promise<Section>;
}
