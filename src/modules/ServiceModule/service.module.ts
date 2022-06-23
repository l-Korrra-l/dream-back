import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [DbModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
