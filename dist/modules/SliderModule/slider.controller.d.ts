import { SliderService } from './silder.service';
import { SliderForCreate } from './dto/SliderForCreate';
export declare class SliderController {
    private sliderService;
    constructor(sliderService: SliderService);
    createProduct(sliderForCreate: SliderForCreate, file: any): Promise<import(".prisma/client").Slider>;
    updateProduct(sliderForCreate: SliderForCreate, file: any, id: string): Promise<import(".prisma/client").Slider>;
    getSlider(id: string): Promise<import(".prisma/client").Slider>;
    getAllSliders(): Promise<import(".prisma/client").Slider[]>;
    deleteSlider(id: string): Promise<boolean>;
}
