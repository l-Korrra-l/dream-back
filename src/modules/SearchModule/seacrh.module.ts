import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { SearchController } from './Search.controller';
import { SearchService } from './Search.service';

@Module({
  imports: [DbModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
