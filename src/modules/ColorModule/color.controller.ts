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
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Sorting } from 'src/decorators/sortheader.decorator';
import { Role } from 'src/enums/role.enum';
import { Sort } from 'src/enums/sort.enum';
import { CurrentUserInfo } from 'src/types/types';
import { JoiValidationPipe } from 'src/validation/joivalidation.pipe';
import { reviewFromUserSchema } from 'src/validation/schemas/reviewFromUser.schema';
import { JwtAuthGuard } from '../AuthModule/guards/jwt.guard';
import { RolesGuard } from '../AuthModule/guards/roles.guard';
import { ColorService } from './color.service';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';
import { SortingBy } from 'src/decorators/sortbyheader.decorator';

@Controller('color')
export class ColorController {
  constructor(private colorService: ColorService) {}

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
  async createColor(
    // @Body()
    // colorForCreate: ColorForCreate,
    @Body()
    colorForCreate: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file != undefined)
      colorForCreate.img_path =
        'http://194.62.19.52:7000/' + file?.path?.split('\\')[1];
    return await this.colorService.createColor(colorForCreate);
  }

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
  @Patch(':id')
  async updateColor(
    @Param('id') colorId: string,
    @Body()
    colorForUpdate: any,
    @UploadedFile() file: any,
  ) {
    return await this.colorService.updateColor(
      colorId,
      colorForUpdate,
      'http://194.62.19.52:7000/' + file.path.split('\\')[1],
    );
  }

  @Get()
  async getAllcolors() {
    return await this.colorService.getAll();
  }
  @Get('/:id')
  async getColor(@Param('id') id: string) {
    return await this.colorService.getOne(id);
  }

  @Delete('/')
  async deleteColorByProductAndName(
    @Query('prod') prod: string,
    @Query('name') name: string,
  ) {
    if (name != null && name != undefined)
      return await this.colorService.deleteColorByProductAndName(prod, name);
    return await this.colorService.deleteColorByProduct(prod);
  }
  x;
  @Delete('/:id')
  async deleteColor(@Param('id') id: string) {
    return await this.colorService.deleteColor(id);
  }
}
