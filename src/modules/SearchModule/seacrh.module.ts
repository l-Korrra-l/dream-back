import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [DbModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
