import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { DiscountSeasonController } from './discountSeason.controller';
import { DiscountSeasonService } from './discountSeason.service';

@Module({
  imports: [DbModule],
  controllers: [DiscountSeasonController],
  providers: [DiscountSeasonService],
})
export class DiscountSeasonModule {}
