import { Prisma } from '@prisma/client';

export const productWithReviews = Prisma.validator<Prisma.ProductArgs>()({
  include: {
    reviews: true,
  },
});

export type ProductWithReviews = Prisma.ProductGetPayload<
  typeof productWithReviews
>;
