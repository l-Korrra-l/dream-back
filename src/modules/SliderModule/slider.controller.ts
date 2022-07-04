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
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from '../AuthModule/guards/jwt.guard';
import { RolesGuard } from '../AuthModule/guards/roles.guard';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';
import { SliderService } from './silder.service';
import { SliderForCreate } from './dto/SliderForCreate';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('slider')
export class SliderController {
  constructor(private sliderService: SliderService) {}

  @ApiOperation({ summary: 'добавить объект карусели' })
  @Post()
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
  // @UseGuards(JwtAuthGuard, RolesGuard)
 
  async createProduct(
    @Body()
    sliderForCreate: SliderForCreate,
    @UploadedFile() file: any,
  ) {
    sliderForCreate.img_path =
      'http://194.62.19.52:7000/' + file.path.split('\\')[1];
    return await this.sliderService.createSlider(sliderForCreate);
  }

  @ApiOperation({
    summary: 'изменить объект карусели по id',
  })
  @Patch('/:id')
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
  // @UseGuards(JwtAuthGuard, RolesGuard)
 
  async updateProduct(
    @Body()
    sliderForCreate: SliderForCreate,
    @UploadedFile() file: any,
    @Param('id') id: string,
  ) {
    sliderForCreate.img_path =
      'http://194.62.19.52:7000/' + file.path.split('\\')[1];
    return await this.sliderService.updateSlider(id, sliderForCreate);
  }

  @ApiOperation({
    summary: 'получить объект карусели по id',
  })
  @Get('/:id')
  async getSlider(@Param('id') id: string) {
    return await this.sliderService.getOne(id);
  }

  @ApiOperation({
    summary: 'получить все объекты карусели',
  })
  @Get()
  async getAllSliders() {
    const order = await this.sliderService.getAll();
    return order;
  }

  @ApiOperation({
    summary: 'удалить объект карусели по id',
  })
  // @UseGuards(JwtAuthGuard, RolesGuard)
 
  @Delete('/:id')
  async deleteSlider(@Param('id') id: string) {
    return await this.sliderService.deleteSlider(id);
  }
}
