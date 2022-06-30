import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';

@Module({
  imports: [DbModule],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
