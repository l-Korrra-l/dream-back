import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { CharacteristicController } from './characteristic.controller';
import { CharacteristicService } from './characteristic.service';

@Module({
  imports: [DbModule],
  controllers: [CharacteristicController],
  providers: [CharacteristicService],
})
export class CharacteristicModule {}
