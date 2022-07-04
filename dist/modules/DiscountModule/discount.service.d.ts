import { Discount } from '@prisma/client';
import { DiscountRepository } from 'src/persistance/repository/discount.repository';
export declare class DiscountService {
    private discountRepository;
    constructor(discountRepository: DiscountRepository);
    createDiscount(inputDiscount: any): Promise<Discount>;
    deleteDiscount(id: string): Promise<boolean>;
    deleteDiscountByProduct(id: string): Promise<boolean>;
    getOne(id: string): Promise<Discount>;
    getAll(): Promise<Discount[]>;
    findByProduct(id: string): Promise<Discount[]>;
    updateDiscount(discountId: string, discountForUpdate: any): Promise<Discount>;
}
