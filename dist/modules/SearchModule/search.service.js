"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../../persistance/repository/product.repository");
const service_repository_1 = require("../../persistance/repository/service.repository");
let SearchService = class SearchService {
    constructor(productRepository, serviceRepository) {
        this.productRepository = productRepository;
        this.serviceRepository = serviceRepository;
    }
    async findByFilters(filters, sort, sortby) {
        let arr;
        if (filters.name != null && filters.name != undefined) {
            arr = await this.productRepository.findByName(filters.name, sort);
        }
        else if (filters.text != null && filters.text != undefined)
            arr = await this.productRepository.findByText(filters.text, sort);
        else if (filters.producer != null && filters.producer != undefined)
            return await this.productRepository.findByProducer(filters.producer, sort, sortby);
        else
            arr = await this.productRepository.findAll();
        if (!filters.min_price)
            filters.min_price = -1;
        if (!filters.max_price)
            filters.max_price = Number.MAX_VALUE / 2;
        if (filters.producer != null && filters.producer != undefined)
            arr = arr.map((i) => {
                if (i.producer.includes(filters.producer))
                    return i;
            });
        arr = arr.map((i) => {
            if (i.price > parseFloat(filters.min_price) &&
                i.price < parseFloat(filters.max_price))
                return i;
        });
        let arrS;
        if (filters.name != null && filters.name != undefined) {
            arrS = await this.serviceRepository.findByName(filters.name, sort);
        }
        else if (filters.text != null && filters.text != undefined)
            arrS = await this.serviceRepository.findByText(filters.text, sort);
        else
            arrS = await this.serviceRepository.findAll();
        if (!filters.min_price)
            filters.min_price = -1;
        if (!filters.max_price)
            filters.max_price = Number.MAX_VALUE / 2;
        arrS = arrS.map((i) => {
            if (i.price > parseFloat(filters.min_price) &&
                i.price < parseFloat(filters.max_price))
                return i;
        });
        return { products: arr, services: arrS };
    }
};
SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        service_repository_1.ServiceRepository])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map