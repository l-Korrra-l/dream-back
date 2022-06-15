import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [DbModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
