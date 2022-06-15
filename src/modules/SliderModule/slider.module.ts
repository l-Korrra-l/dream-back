import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { SliderService } from './silder.service';
import { SliderController } from './slider.controller';

@Module({
  imports: [DbModule],
  controllers: [SliderController],
  providers: [SliderService],
})
export class SliderModule {}
