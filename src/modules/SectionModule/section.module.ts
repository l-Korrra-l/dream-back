import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';

@Module({
  imports: [DbModule],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
