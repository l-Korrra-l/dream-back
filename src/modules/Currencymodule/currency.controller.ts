import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from '../AuthModule/guards/jwt.guard';
import { RolesGuard } from '../AuthModule/guards/roles.guard';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @ApiOperation({
    summary: 'добавить курс валюты',
  })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  async createCurrency(@Body() rate: any) {
    return await this.currencyService.createCurrency(rate.rate);
  }

  @ApiOperation({
    summary: 'изменить курс валюты',
  })
  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  async updateCurrency(@Body() rate: string) {
    return await this.currencyService.createCurrency(rate);
  }

  @ApiOperation({
    summary: 'получить курс валюты',
  })
  @Get()
  async getCurrency() {
    return await this.currencyService.getOne();
  }
}
