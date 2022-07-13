import { Sort } from 'src/enums/sort.enum';
import { SearchService } from './search.service';
export declare class SearchController {
    private searchService;
    constructor(searchService: SearchService);
    searchProductss(sort: Sort, sortby: string, name: string, text: string, min_price: string, max_price: string, producer: string): Promise<any>;
}
