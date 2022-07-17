/// <reference types="multer" />
import { Sort } from 'src/enums/sort.enum';
import { CurrentUserInfo } from 'src/types/types';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ServiceService } from './service.service';
import { ServiceForCreate } from './dto/serviceforcreate.dto';
import { ServiceForUpdate } from './dto/serviceforupdate.dto';
export declare class ServiceController {
    private serviceService;
    constructor(serviceService: ServiceService);
    createService(serviceForCreate: ServiceForCreate, file: Express.Multer.File): Promise<void>;
    getAllproducts(sort: Sort, sortby: string): Promise<import(".prisma/client").Service[]>;
    searchServicess(sort: Sort, sortby: string, name: string, text: string, min_price: string, max_price: string): Promise<import(".prisma/client").Service[]>;
    makeReviewForService(serviceId: any, currentUser: CurrentUserInfo, review: ReviewFromUser): Promise<import(".prisma/client").Review>;
    updateService(serviceId: string, serviceForUpdate: ServiceForUpdate, file: any): Promise<import(".prisma/client").Service>;
    getService(id: string): Promise<import(".prisma/client").Service>;
}
