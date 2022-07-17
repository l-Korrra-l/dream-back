import { ServiceForCreate } from './dto/serviceforcreate.dto';
import { Service } from '@prisma/client';
import { Sort } from 'src/enums/sort.enum';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { ServiceForUpdate } from './dto/serviceforupdate.dto';
import { CategoryRepository } from 'src/persistance/repository/category.repository';
import { ServiceRepository } from 'src/persistance/repository/service.repository';
export declare class ServiceService {
    private serviceRepository;
    private reviewRepository;
    private categoryRepository;
    constructor(serviceRepository: ServiceRepository, reviewRepository: ReviewRepository, categoryRepository: CategoryRepository);
    createService(inputService: ServiceForCreate): Promise<Service>;
    connectProduct(servId: number, id: number): Promise<Service>;
    getOne(id: string): Promise<Service>;
    getAll(sort: Sort, sortby: string): Promise<Service[]>;
    findByFilters(filters: any, sort: Sort, sortby: string): Promise<Service[]>;
    makeReview(userId: string, author: string, serviceId: string, review: ReviewFromUser): Promise<import(".prisma/client").Review>;
    updateService(serviceId: string, serviceForUpdate: ServiceForUpdate, newImage: string): Promise<Service>;
}
