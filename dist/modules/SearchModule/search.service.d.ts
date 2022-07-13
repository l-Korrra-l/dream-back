import { Sort } from 'src/enums/sort.enum';
import { ProductRepository } from 'src/persistance/repository/product.repository';
import { ServiceRepository } from 'src/persistance/repository/service.repository';
export declare class SearchService {
    private productRepository;
    private serviceRepository;
    constructor(productRepository: ProductRepository, serviceRepository: ServiceRepository);
    findByFilters(filters: any, sort: Sort, sortby: string): Promise<any>;
}
