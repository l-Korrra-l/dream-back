import { DiscountSeason } from '@prisma/client';
import { DiscountSeasonRepository } from 'src/persistance/repository/discountSeason.repository';
export declare class DiscountSeasonService {
    private discountseasonRepository;
    constructor(discountseasonRepository: DiscountSeasonRepository);
    createDiscountSeason(inputDiscountSeason: any): Promise<DiscountSeason>;
    deleteDiscountSeason(id: string): Promise<boolean>;
    deleteDiscountSeasonByName(name: string): Promise<boolean>;
    getOne(id: string): Promise<DiscountSeason>;
    getAll(): Promise<DiscountSeason[]>;
    findByName(name: string): Promise<DiscountSeason[]>;
    updateDiscountSeason(discountseasonId: string, discountseasonForUpdate: any): Promise<DiscountSeason>;
}
