import { Prisma } from '@prisma/client';

export const productWithReviews = Prisma.validator<Prisma.ProductArgs>()({
  include: {
    reviews: true,
  },
});

export type ProductWithReviews = Prisma.ProductGetPayload<
  typeof productWithReviews
>;

export const serviceWithReviews = Prisma.validator<Prisma.ServiceArgs>()({
  include: {
    reviews: true,
  },
});

export type ServiceWithReviews = Prisma.ServiceGetPayload<
  typeof productWithReviews
>;
