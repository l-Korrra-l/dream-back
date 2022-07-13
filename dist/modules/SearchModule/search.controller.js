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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sort_enum_1 = require("../../enums/sort.enum");
const search_service_1 = require("./search.service");
let SearchController = class SearchController {
    constructor(searchService) {
        this.searchService = searchService;
    }
    async searchProductss(sort, sortby, name, text, min_price, max_price, producer) {
        let filters;
        if (name)
            filters.text = name;
        if (min_price)
            filters.min_price = min_price;
        if (max_price)
            filters.max_price = max_price;
        if (!sort)
            sort = sort_enum_1.Sort.asc;
        return await this.searchService.findByFilters(filters, sort, sortby);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '����� �������� �� ��������' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('sort')),
    __param(1, (0, common_1.Query)('by')),
    __param(2, (0, common_1.Query)('name')),
    __param(3, (0, common_1.Query)('text')),
    __param(4, (0, common_1.Query)('minprice')),
    __param(5, (0, common_1.Query)('maxprice')),
    __param(6, (0, common_1.Query)('producer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "searchProductss", null);
SearchController = __decorate([
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
exports.SearchController = SearchController;
//# sourceMappingURL=search.controller.js.map