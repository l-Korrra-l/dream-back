import { DiscountSeasonService } from './discountSeason.service';
export declare class DiscountSeasonController {
    private discountseasonService;
    constructor(discountseasonService: DiscountSeasonService);
    createDiscountSeason(discountseasonForCreate: any): Promise<import(".prisma/client").DiscountSeason>;
    updateDiscountSeason(discountseasonId: string, discountseasonForUpdate: any): Promise<import(".prisma/client").DiscountSeason>;
    getAlldiscountseasons(name: string): Promise<import(".prisma/client").DiscountSeason[]>;
    getDiscountSeason(id: string): Promise<import(".prisma/client").DiscountSeason>;
    deleteDiscountSeasonByName(name: string): Promise<boolean>;
    deleteDiscountSeason(id: string): Promise<boolean>;
}
