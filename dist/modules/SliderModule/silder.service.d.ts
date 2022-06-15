import { Slider } from '@prisma/client';
import { SliderForCreate } from './dto/SliderForCreate';
import { SliderRepository } from 'src/persistance/repository/slider.repository';
export declare class SliderService {
    private sliderRepository;
    constructor(sliderRepository: SliderRepository);
    createSlider(inputSlider: SliderForCreate): Promise<Slider>;
    getOne(id: string): Promise<Slider>;
    getAll(): Promise<Slider[]>;
    updateSlider(id: string, inputSlider: SliderForCreate): Promise<Slider>;
    deleteSlider(id: string): Promise<boolean>;
}
