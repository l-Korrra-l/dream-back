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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const review_repository_1 = require("../../persistance/repository/review.repository");
const category_repository_1 = require("../../persistance/repository/category.repository");
const service_repository_1 = require("../../persistance/repository/service.repository");
let ServiceService = class ServiceService {
    constructor(serviceRepository, reviewRepository, categoryRepository) {
        this.serviceRepository = serviceRepository;
        this.reviewRepository = reviewRepository;
        this.categoryRepository = categoryRepository;
    }
    async createService(inputService) {
        const service = await this.serviceRepository.create(Object.assign({ raiting: 0 }, inputService));
        return service;
    }
    async getOne(id) {
        return await this.serviceRepository.findOne(id);
    }
    async getAll(sort, sortby) {
        return await this.serviceRepository.findAllWithSorting(sort, sortby);
    }
    async findByFilters(filters, sort, sortby) {
        let arr;
        if (filters.name != null && filters.name != undefined)
            arr = await this.serviceRepository.findByName(filters.name, sort);
        else if (filters.text != null && filters.text != undefined)
            arr = await this.serviceRepository.findByText(filters.text, sort);
        if (!filters.min_price)
            filters.min_price = -1;
        if (!filters.max_price)
            filters.max_price = Number.MAX_VALUE / 2;
        return arr.map((i) => {
            if (i.price > parseFloat(filters.min_price) &&
                i.price < parseFloat(filters.max_price))
                return i;
        });
    }
    async makeReview(userId, author, serviceId, review) {
        const service = await this.serviceRepository.findWithReviews(serviceId);
        if (service.reviews.find((rec) => rec.userId == Number(userId))) {
            throw new common_1.ForbiddenException('Review for this service already exists');
        }
        const serviceStats = await this.reviewRepository.getStatsOfService(serviceId);
        const newRaiting = ((serviceStats.sum + review.raiting) /
            (serviceStats.count + 1)).toFixed(1);
        await this.serviceRepository.update(serviceId, {
            raiting: parseFloat(newRaiting),
        });
        return await this.reviewRepository.create(Object.assign({ prodId: serviceId, userId: userId, authorName: author, productName: service.name, createdDate: new Date() }, review));
    }
    async updateService(serviceId, serviceForUpdate, newImage) {
        const service = await this.serviceRepository.findOne(serviceId);
        serviceForUpdate.img_path = newImage;
        return await this.serviceRepository.update(serviceId, serviceForUpdate);
    }
};
ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [service_repository_1.ServiceRepository,
        review_repository_1.ReviewRepository,
        category_repository_1.CategoryRepository])
], ServiceService);
exports.ServiceService = ServiceService;
//# sourceMappingURL=service.service.js.map