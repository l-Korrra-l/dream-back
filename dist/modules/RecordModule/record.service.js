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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordService = void 0;
const common_1 = require("@nestjs/common");
const record_repository_1 = require("src/persistance/repository/record.repository");
const image_service_1 = require("../ImageModule/image.service");
const review_repository_1 = require("../../persistance/repository/review.repository");
let RecordService = class RecordService {
    constructor(recordRepository, imageService, reviewRepository) {
        this.recordRepository = recordRepository;
        this.imageService = imageService;
        this.reviewRepository = reviewRepository;
    }
    async createRecord(inputRecord) {
        const { image } = inputRecord, recordForCreate = __rest(inputRecord, ["image"]);
        const savedImage = await this.imageService.createImage(image);
        const record = await this.recordRepository.create(Object.assign({ imageUrl: savedImage.imageUrl, imageId: savedImage.imageId, raiting: 0 }, recordForCreate));
        return record;
    }
    async getOne(id) {
        return await this.recordRepository.findOne(id);
    }
    async getAll(sort) {
        return await this.recordRepository.findAllWithSorting(sort);
    }
    async findByValue(name, author) {
        return await this.recordRepository.findByValue(name, author);
    }
    async makeReview(userId, author, recordId, review) {
        const record = await this.recordRepository.findWithReviews(recordId);
        if (record.review.find((rec) => rec.userId == userId)) {
            throw new common_1.ForbiddenException('Review for this record already exists');
        }
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const date = `${today.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? day + '0' : day}`;
        const recordStats = await this.reviewRepository.getStatsOfRecord(recordId);
        const newRaiting = ((recordStats.sum + review.raiting) /
            (recordStats.count + 1)).toFixed(1);
        await this.recordRepository.update(recordId, {
            raiting: parseFloat(newRaiting),
        });
        return await this.reviewRepository.create(Object.assign({ recordId: recordId, userId: userId, authorName: author, recordName: record.name, createdDate: date }, review));
    }
    async updateRecord(recordId, recordForUpdate, newImage) {
        const record = await this.recordRepository.findOne(recordId);
        if (newImage) {
            this.imageService.validateImage(newImage);
            await this.imageService.updateImage(record.imageId, newImage);
        }
        return await this.recordRepository.update(recordId, recordForUpdate);
    }
};
RecordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof record_repository_1.RecordRepository !== "undefined" && record_repository_1.RecordRepository) === "function" ? _a : Object, typeof (_b = typeof image_service_1.ImageService !== "undefined" && image_service_1.ImageService) === "function" ? _b : Object, review_repository_1.ReviewRepository])
], RecordService);
exports.RecordService = RecordService;
//# sourceMappingURL=record.service.js.map