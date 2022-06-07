/// <reference types="multer" />
import { StoredImage } from '../../types/image.type';
import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private configService;
    private storage;
    private bucket;
    constructor(configService: ConfigService);
    save(path: string, image: Express.Multer.File): Promise<void>;
    delete(path: string): Promise<void>;
    get(path: string): Promise<StoredImage>;
    getWithMetaData(path: string): Promise<StoredImage>;
    update(id: string, image: Express.Multer.File): Promise<void>;
}
