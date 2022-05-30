import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [DbModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
