import { Prisma } from '@prisma/client';

export const recordWithReviews = Prisma.validator<Prisma.ProductArgs>()({
  include: {
    reviews: true,
  },
});

// export type RecordWithReviews = Prisma.ProductGetPayload<
//   typeof productWithReviews
// >;

// export const orderWithRecordAndUser = Prisma.validator<Prisma.OrderArgs>()({
//   include: {
//     user: true,
//     product: true,
//   },
// });

// export type OrderWithRecordAndUser = Prisma.OrderGetPayload<
//   typeof orderWithRecordAndUser
// >;
