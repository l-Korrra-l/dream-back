import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { MemoryController } from './memory.controller';
import { MemoryService } from './memory.service';

@Module({
  imports: [DbModule],
  controllers: [MemoryController],
  providers: [MemoryService],
})
export class MemoryModule {}
