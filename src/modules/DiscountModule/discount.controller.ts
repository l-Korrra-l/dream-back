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
import { DiscountService } from './discount.service';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('discount')
export class DiscountController {
  constructor(private discountService: DiscountService) {}

   @Post()
 
  async createDiscount(
    // @Body()
    // discountForCreate: DiscountForCreate,
    @Body()
    discountForCreate: any,
  ) {
    return await this.discountService.createDiscount(discountForCreate);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
 
  @Patch(':id')
  async updateDiscount(
    @Param('id') discountId: string,
    @Body()
    discountForUpdate: any,
  ) {
    return await this.discountService.updateDiscount(
      discountId,
      discountForUpdate,
    );
  }

  @Get()
  async getAlldiscounts(@Query('prod') prod: string) {
    if (prod != '' && prod != undefined && prod != null)
      return await this.discountService.findByProduct(prod);
    return await this.discountService.getAll();
  }
  @Get('/:id')
  async getDiscount(@Param('id') id: string) {
    return await this.discountService.getOne(id);
  }

  @Delete('/')
  async deleteDiscountByProductAndName(@Query('prod') prod: string) {
    return await this.discountService.deleteDiscountByProduct(prod);
  }

  @Delete('/:id')
  async deleteDiscount(@Param('id') id: string) {
    return await this.discountService.deleteDiscount(id);
  }
}
