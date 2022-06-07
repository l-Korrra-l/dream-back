/// <reference types="multer" />
import { RecordForCreate } from './dto/recordforcreate.dto';
import { VinylRecord } from '@prisma/client';
import { RecordRepository } from 'src/persistance/repository/record.repository';
import { ImageService } from '../ImageModule/image.service';
import { Sort } from 'src/enums/sort.enum';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ReviewRepository } from 'src/persistance/repository/review.repository';
import { RecordForUpdate } from './dto/recordforupdate.dto';
export declare class RecordService {
    private recordRepository;
    private imageService;
    private reviewRepository;
    constructor(recordRepository: RecordRepository, imageService: ImageService, reviewRepository: ReviewRepository);
    createRecord(inputRecord: RecordForCreate): Promise<VinylRecord>;
    getOne(id: string): Promise<VinylRecord>;
    getAll(sort: Sort): Promise<VinylRecord[]>;
    findByValue(name: string, author: string): Promise<any>;
    makeReview(userId: string, author: string, recordId: string, review: ReviewFromUser): Promise<import(".prisma/client").Review>;
    updateRecord(recordId: string, recordForUpdate: RecordForUpdate, newImage: Express.Multer.File): Promise<any>;
}
