import { SectionService } from './section.service';
export declare class SectionController {
    private sectionService;
    constructor(sectionService: SectionService);
    createSection(sectionForCreate: any): Promise<import(".prisma/client").Section>;
    updateSection(sectionId: string, sectionForUpdate: any): Promise<import(".prisma/client").Section>;
    getSectionByName(name: string): Promise<import(".prisma/client").Section[]>;
    getSection(id: string): Promise<import(".prisma/client").Section>;
    deleteSectionByName(name: string): Promise<boolean>;
    deleteSection(id: string): Promise<boolean>;
}
