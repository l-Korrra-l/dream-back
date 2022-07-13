import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { Sort } from 'src/enums/sort.enum';
import { JwtAuthGuard } from '../AuthModule/guards/jwt.guard';
import { RolesGuard } from '../AuthModule/guards/roles.guard';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @ApiOperation({ summary: 'поиск продукта по фильтрам' })
  @Get()
  async searchProductss(
    @Query('sort') sort: Sort,
    @Query('by') sortby: string,
    @Query('name') name: string,
    @Query('text') text: string,
    @Query('minprice') min_price: string,
    @Query('maxprice') max_price: string,
    @Query('producer') producer: string,
  ) {
    let filters: any = {};
    //TODO
    if (name) filters.text = name;
    // if (name) filters.name = name;
    // if (text) filters.text = text;
    if (min_price) filters.min_price = min_price;
    if (max_price) filters.max_price = max_price;
    if (!sort) sort = Sort.asc;
    return await this.searchService.findByFilters(filters, sort, sortby);
  }
}
