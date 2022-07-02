import { Information } from '@prisma/client';
import { InformationRepository } from 'src/persistance/repository/information.repository';
export declare class InformationService {
    private informationRepository;
    constructor(informationRepository: InformationRepository);
    createInformation(inputInformation: any): Promise<Information>;
    deleteInformation(id: string): Promise<boolean>;
    deleteInformationByProduct(id: string): Promise<boolean>;
    deleteInformationByProductAndName(id: string, name: string): Promise<boolean>;
    getOne(id: string): Promise<Information>;
    getAll(): Promise<Information[]>;
    findByProduct(id: string): Promise<Information[]>;
    updateInformation(informationId: string, informationForUpdate: any, newImage: string): Promise<Information>;
    updateInformationWithoutPicture(informationId: string, informationForUpdate: any): Promise<Information>;
}
