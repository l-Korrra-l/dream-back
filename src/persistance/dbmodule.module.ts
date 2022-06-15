import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { prismaConfigAsync } from 'src/config/prisma.config';
import { BucketRepository } from './repository/bucket.repository';
import { CurrencyRepository } from './repository/currency.repository';
import { OrderRepository } from './repository/order.repository';
import { ProductRepository } from './repository/product.repository';
import { ReviewRepository } from './repository/review.repository';
import { SliderRepository } from './repository/slider.repository';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [PrismaModule.forRootAsync(prismaConfigAsync)],
  providers: [
    UserRepository,
    ProductRepository,
    ReviewRepository,
    OrderRepository,
    BucketRepository,
    CurrencyRepository,
    SliderRepository,
  ],
  exports: [
    UserRepository,
    ProductRepository,
    ReviewRepository,
    OrderRepository,
    BucketRepository,
    CurrencyRepository,
    SliderRepository,
  ],
})
export class DbModule {}
