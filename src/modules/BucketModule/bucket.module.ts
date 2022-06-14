import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';

@Module({
  imports: [DbModule],
  controllers: [BucketController],
  providers: [BucketService],
})
export class BucketModule {}
