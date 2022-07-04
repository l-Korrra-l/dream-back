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
import { CategoryService } from './category.service';
import { CategoryForCreate } from './dto/categoryforcreate.dto';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { ApiOperation } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public',
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createCategory(
    @Body()
    categoryForCreate: CategoryForCreate,
    @UploadedFile() file: any,
  ) {
    if (file != undefined)
      categoryForCreate.img_path =
        'http://194.62.19.52:7000/' + file.path.split('\\')[1];
    return await this.categoryService.createCategory(categoryForCreate);
  }

  @ApiOperation({ summary: 'get product by id' })
  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    return await this.categoryService.getOne(id);
  }

  @ApiOperation({ summary: 'get all products' })
  @Get()
  async getAllproducts() {
    return await this.categoryService.getAll();
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async deleteProduct(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public',
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateCategory(
    @Body()
    categoryForCreate: CategoryForCreate,
    @UploadedFile() file: any,
    @Param('id') id: string,
  ) {
    categoryForCreate.img_path =
      'http://194.62.19.52:7000/' + file.path.split('\\')[1];
    return await this.categoryService.updateCategory(id, categoryForCreate);
  }
}
