import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';

@Module({
  imports: [DbModule],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
