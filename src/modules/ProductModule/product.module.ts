import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { CharactValueService } from '../CharactValueModule/charactValue.service';
import { ColorService } from '../ColorModule/color.service';
import { InformationService } from '../InformationModule/information.service';
import { MaterialService } from '../MaterialModule/material.service';
import { MemoryService } from '../MemoryModule/memory.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [DbModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    CharactValueService,
    ColorService,
    MemoryService,
    MaterialService,
    InformationService,
  ],
})
export class ProductModule {}
