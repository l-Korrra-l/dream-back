import { SliderService } from './silder.service';
import { SliderForCreate } from './dto/SliderForCreate';
export declare class SliderController {
    private sliderService;
    constructor(sliderService: SliderService);
    createProduct(sliderForCreate: SliderForCreate, file: any): Promise<Slider>;
    updateProduct(sliderForCreate: SliderForCreate, file: any, id: string): Promise<Slider>;
    getSlider(id: string): Promise<Slider>;
    getAllSliders(): Promise<Slider[]>;
    deleteSlider(id: string): Promise<boolean>;
}
