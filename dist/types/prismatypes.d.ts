import { Prisma } from '@prisma/client';
export declare const productWithReviews: {
    include: {
        reviews: true;
    };
};
export declare type ProductWithReviews = Prisma.ProductGetPayload<typeof productWithReviews>;
