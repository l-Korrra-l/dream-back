import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { CharactValueController } from './charactValue.controller';
import { CharactValueService } from './charactValue.service';

@Module({
  imports: [DbModule],
  controllers: [CharactValueController],
  providers: [CharactValueService],
})
export class CharactValueModule {}
