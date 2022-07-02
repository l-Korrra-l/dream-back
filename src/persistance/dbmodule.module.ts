import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { prismaConfigAsync } from 'src/config/prisma.config';
import { BucketRepository } from './repository/bucket.repository';
import { CategoryRepository } from './repository/category.repository';
import { CharacteristicRepository } from './repository/characteristic.repository';
import { CharactValueRepository } from './repository/charactValue.repository';
import { ColorRepository } from './repository/color.repository';
import { CurrencyRepository } from './repository/currency.repository';
import { InformationRepository } from './repository/information.repository';
import { MaterialRepository } from './repository/material.repository';
import { MemoryRepository } from './repository/memory.repository';
import { OrderRepository } from './repository/order.repository';
import { ProductRepository } from './repository/product.repository';
import { ReviewRepository } from './repository/review.repository';
import { SectionRepository } from './repository/section.repository';
import { ServiceRepository } from './repository/service.repository';
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
    CategoryRepository,
    ServiceRepository,
    CharacteristicRepository,
    MaterialRepository,
    MemoryRepository,
    ColorRepository,
    CharactValueRepository,
    SectionRepository,
    InformationRepository,
  ],
  exports: [
    UserRepository,
    ProductRepository,
    ReviewRepository,
    OrderRepository,
    BucketRepository,
    CurrencyRepository,
    SliderRepository,
    CategoryRepository,
    ServiceRepository,
    CharacteristicRepository,
    MaterialRepository,
    MemoryRepository,
    ColorRepository,
    CharactValueRepository,
    SectionRepository,
    InformationRepository,
  ],
})
export class DbModule {}
