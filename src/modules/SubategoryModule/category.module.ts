import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [DbModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
