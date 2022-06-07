/// <reference types="multer" />
import { Decimal } from '@prisma/client/runtime';
export declare class RecordForCreate {
    name: string;
    author: string;
    description: string;
    image: Express.Multer.File;
    price: Decimal;
}
