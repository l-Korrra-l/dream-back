import { Bucket } from '@prisma/client';
export declare class OrderForCreate {
    cartItems: Bucket[];
    firstName?: string;
    lastname?: string;
    phoneNumber?: string;
}
