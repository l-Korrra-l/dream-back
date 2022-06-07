/// <reference types="multer" />
import { Sort } from 'src/enums/sort.enum';
import { CurrentUserInfo } from 'src/types/types';
import { RecordForCreate } from './dto/recordforcreate.dto';
import { RecordForUpdate } from './dto/recordforupdate.dto';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { RecordService } from './record.service';
export declare class RecordController {
    private recordService;
    constructor(recordService: RecordService);
    createRecord(recordForCreate: RecordForCreate, image: Express.Multer.File): Promise<VinylRecord>;
    getRecord(id: string): Promise<VinylRecord>;
    getAllrecords(sort: Sort): Promise<VinylRecord[]>;
    searchRecords(valueForSearch: string): Promise<any>;
    makeReviewForRecord(recordId: any, currentUser: CurrentUserInfo, review: ReviewFromUser): Promise<import(".prisma/client").Review>;
    updateRecord(recordId: string, recordForUpdate: RecordForUpdate, newimage: Express.Multer.File): Promise<any>;
}
