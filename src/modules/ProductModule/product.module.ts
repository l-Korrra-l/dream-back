import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { CharactValueModule } from '../CharactValueModule/charactValue.module';
import { CharactValueService } from '../CharactValueModule/charactValue.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [DbModule],
  controllers: [ProductController],
  providers: [ProductService, CharactValueService],
})
export class ProductModule {}
