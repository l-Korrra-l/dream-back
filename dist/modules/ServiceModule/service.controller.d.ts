/// <reference types="multer" />
import { Sort } from 'src/enums/sort.enum';
import { CurrentUserInfo } from 'src/types/types';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ServiceService } from './service.service';
import { ServiceForUpdate } from './dto/serviceForupdate.dto';
import { ServiceForCreate } from './dto/serviceforcreate.dto';
export declare class ServiceController {
    private serviceService;
    constructor(serviceService: ServiceService);
    createService(serviceForCreate: ServiceForCreate, file: Express.Multer.File): Promise<import(".prisma/client").Service>;
    getAllproducts(sort: Sort, sortby: string): Promise<import(".prisma/client").Service[]>;
    searchServices(sort: Sort, sortby: string, filters: any): Promise<import(".prisma/client").Service[]>;
    makeReviewForService(serviceId: any, currentUser: CurrentUserInfo, review: ReviewFromUser): Promise<import(".prisma/client").Review>;
    updateService(serviceId: string, serviceForUpdate: ServiceForUpdate, file: any): Promise<import(".prisma/client").Service>;
    getService(id: string): Promise<import(".prisma/client").Service>;
}
