import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { SearchController } from 'src/modules/SearchModule/search.controller';
import { SearchService } from 'src/modules/SearchModule/search.service';

@Module({
  imports: [DbModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
