/// <reference types="multer" />
import { ColorService } from './color.service';
import { ColorForCreate } from './dto/colorforcreate.dto';
export declare class ColorController {
    private colorService;
    constructor(colorService: ColorService);
    createColor(colorForCreate: ColorForCreate, file: Express.Multer.File): Promise<import(".prisma/client").Color>;
    updateColor(colorId: string, colorForUpdate: any, file: any): Promise<import(".prisma/client").Color>;
    getAllcolors(prod: string): Promise<import(".prisma/client").Color[]>;
    getColor(id: string): Promise<import(".prisma/client").Color>;
    deleteColorByProductAndName(prod: string, name: string): Promise<boolean>;
    deleteColor(id: string): Promise<boolean>;
}
