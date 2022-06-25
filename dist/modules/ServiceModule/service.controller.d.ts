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
    createService(serviceForCreate: ServiceForCreate, file: Express.Multer.File): Promise<Service>;
    getAllproducts(sort: Sort, sortby: string): Promise<Service[]>;
    searchServices(sort: Sort, sortby: string, filters: any): Promise<Service[]>;
    makeReviewForService(serviceId: any, currentUser: CurrentUserInfo, review: ReviewFromUser): Promise<Review>;
    updateService(serviceId: string, serviceForUpdate: ServiceForUpdate, file: any): Promise<Service>;
    getService(id: string): Promise<Service>;
}
