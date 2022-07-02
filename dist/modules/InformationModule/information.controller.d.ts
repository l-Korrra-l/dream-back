/// <reference types="multer" />
import { InformationService } from './information.service';
export declare class InformationController {
    private informationService;
    constructor(informationService: InformationService);
    createInformation(informationForCreate: any, file: Express.Multer.File): Promise<import(".prisma/client").Information>;
    updateInformation(informationId: string, informationForUpdate: any, file: any): Promise<import(".prisma/client").Information>;
    getAllinformations(prod: string): Promise<import(".prisma/client").Information[]>;
    getInformation(id: string): Promise<import(".prisma/client").Information>;
    deleteInformationByProductAndName(prod: string): Promise<boolean>;
    deleteInformation(id: string): Promise<boolean>;
}
