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
import { MaterialService } from './material.service';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';
import { MaterialForCreate } from './dto/materailforcreate.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('material')
export class MaterialController {
  constructor(private materialService: MaterialService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
 
  @ApiBearerAuth('access-token')
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
  async createMaterial(
    @Body()
    materialForCreate: MaterialForCreate,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file != undefined)
      materialForCreate.img_path =
        'http://194.62.19.52:7000/' + file?.path?.split('\\')[1];
    return await this.materialService.createMaterial(materialForCreate);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
 
  @ApiBearerAuth('access-token')
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
  @Patch(':id')
  async updateMaterial(
    @Param('id') materialId: string,
    @Body()
    materialForUpdate: any,
    @UploadedFile() file: any,
  ) {
    return await this.materialService.updateMaterial(
      materialId,
      materialForUpdate,
      'http://194.62.19.52:7000/' + file.path.split('\\')[1],
    );
  }

  @Get()
  async getAllmaterials(@Query('prod') prod: string) {
    if (prod != '' && prod != undefined && prod != null)
      return await this.materialService.findByProduct(prod);
    return await this.materialService.getAll();
  }
  @Get('/:id')
  async getMaterial(@Param('id') id: string) {
    return await this.materialService.getOne(id);
  }

  @Delete('/')
  async deleteMaterialByProductAndName(
    @Query('prod') prod: string,
    @Query('name') name: string,
  ) {
    if (name != null && name != undefined)
      return await this.materialService.deleteMaterialByProductAndName(
        prod,
        name,
      );
    return await this.materialService.deleteMaterialByProduct(prod);
  }

  @Delete('/:id')
  async deleteMaterial(@Param('id') id: string) {
    return await this.materialService.deleteMaterial(id);
  }
}
