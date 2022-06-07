/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { SaveImageInfo } from 'src/types/types';
export declare class ImageService {
    private configService;
    constructor(configService: ConfigService);
    createImage(image: Express.Multer.File): Promise<SaveImageInfo>;
    updateImage(imageId: string, image: Express.Multer.File): Promise<void>;
    genImageLink(id: string): string;
    validateImage(image: Express.Multer.File): void;
}
