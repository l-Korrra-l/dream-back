import { Decimal } from '@prisma/client/runtime';
export declare class ProductForCreate {
    name: string;
    description: string;
    img_path: string;
    price: Decimal;
    in_stock: number;
}
