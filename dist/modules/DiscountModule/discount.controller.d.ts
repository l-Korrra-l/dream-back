import { DiscountService } from './discount.service';
export declare class DiscountController {
    private discountService;
    constructor(discountService: DiscountService);
    createDiscount(discountForCreate: any): Promise<import(".prisma/client").Discount>;
    updateDiscount(discountId: string, discountForUpdate: any): Promise<import(".prisma/client").Discount>;
    getAlldiscounts(prod: string): Promise<import(".prisma/client").Discount[]>;
    getDiscount(id: string): Promise<import(".prisma/client").Discount>;
    deleteDiscountByProductAndName(prod: string): Promise<boolean>;
    deleteDiscount(id: string): Promise<boolean>;
}
