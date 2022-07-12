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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Sorting } from 'src/decorators/sortheader.decorator';
import { Role } from 'src/enums/role.enum';
import { Sort } from 'src/enums/sort.enum';
import { CurrentUserInfo } from 'src/types/types';
import { JwtAuthGuard } from '../AuthModule/guards/jwt.guard';
import { RolesGuard } from '../AuthModule/guards/roles.guard';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryForCreate } from './dto/subcategoryforcreate.dto';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private subcategoryService: SubcategoryService) {}

  @Post()
  async createSubcategory(
    @Body()
    subcategoryForCreate: SubcategoryForCreate,
  ) {
    return await this.subcategoryService.createSubcategory(
      subcategoryForCreate,
    );
  }

  @ApiOperation({ summary: 'get product by id' })
  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    return await this.subcategoryService.getOne(id);
  }

  @ApiOperation({ summary: 'get all products' })
  @Get()
  async getAllproducts() {
    return await this.subcategoryService.getAll();
  }

  @Delete('/:id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteProduct(@Param('id') id: string) {
    return await this.subcategoryService.delete(id);
  }

  @Patch('/:id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async updateSubcategory(
    @Body()
    subcategoryForCreate: SubcategoryForCreate,
    @Param('id') id: string,
  ) {
    return await this.subcategoryService.updateSubcategory(
      id,
      subcategoryForCreate,
    );
  }
}
