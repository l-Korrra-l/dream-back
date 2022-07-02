import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';

@Module({
  imports: [DbModule],
  controllers: [InformationController],
  providers: [InformationService],
})
export class InformationModule {}
