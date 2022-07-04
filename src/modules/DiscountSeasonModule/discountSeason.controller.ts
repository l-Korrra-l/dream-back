import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from '../AuthModule/guards/jwt.guard';
import { RolesGuard } from '../AuthModule/guards/roles.guard';
import { DiscountSeasonService } from './discountSeason.service';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('discountseason')
export class DiscountSeasonController {
  constructor(private discountseasonService: DiscountSeasonService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
 
  @ApiBearerAuth('access-token')
  async createDiscountSeason(
    // @Body()
    // discountseasonForCreate: DiscountSeasonForCreate,
    @Body()
    discountseasonForCreate: any,
  ) {
    return await this.discountseasonService.createDiscountSeason(
      discountseasonForCreate,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
 
  @ApiBearerAuth('access-token')
  @Patch(':id')
  async updateDiscountSeason(
    @Param('id') discountseasonId: string,
    @Body()
    discountseasonForUpdate: any,
  ) {
    return await this.discountseasonService.updateDiscountSeason(
      discountseasonId,
      discountseasonForUpdate,
    );
  }

  @Get()
  async getAlldiscountseasons(@Query('name') name: string) {
    if (name != '' && name != undefined && name != null)
      return await this.discountseasonService.findByName(name);
    return await this.discountseasonService.getAll();
  }
  @Get('/:id')
  async getDiscountSeason(@Param('id') id: string) {
    return await this.discountseasonService.getOne(id);
  }

  @Delete('/')
  async deleteDiscountSeasonByName(@Query('name') name: string) {
    if (name != null && name != undefined)
      return await this.discountseasonService.deleteDiscountSeasonByName(name);
  }

  @Delete('/:id')
  async deleteDiscountSeason(@Param('id') id: string) {
    return await this.discountseasonService.deleteDiscountSeason(id);
  }
}
