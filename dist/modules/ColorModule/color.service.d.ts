import { Color } from '@prisma/client';
import { ColorRepository } from 'src/persistance/repository/color.repository';
export declare class ColorService {
    private colorRepository;
    constructor(colorRepository: ColorRepository);
    createColor(inputColor: any): Promise<Color>;
    deleteColor(id: string): Promise<boolean>;
    deleteColorByProduct(id: string): Promise<boolean>;
    deleteColorByProductAndName(id: string, name: string): Promise<boolean>;
    getOne(id: string): Promise<Color>;
    getAll(): Promise<Color[]>;
    findByProduct(id: string): Promise<Color[]>;
    findByValue(name: string): Promise<Color[]>;
    updateColor(colorId: string, colorForUpdate: any, newImage: string): Promise<Color>;
    updateColorWithoutPicture(colorId: string, colorForUpdate: any): Promise<Color>;
}
