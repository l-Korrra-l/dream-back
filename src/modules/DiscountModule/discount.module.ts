import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';

@Module({
  imports: [DbModule],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}
