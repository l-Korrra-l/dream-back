import { Prisma } from '@prisma/client';
export declare const productWithReviews: {
    include: {
        reviews: true;
    };
};
export declare type ProductWithReviews = Prisma.ProductGetPayload<typeof productWithReviews>;
export declare const serviceWithReviews: {
    include: {
        reviews: true;
    };
};
export declare type ServiceWithReviews = Prisma.ServiceGetPayload<typeof productWithReviews>;
