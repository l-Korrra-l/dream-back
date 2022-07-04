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
import { InformationService } from './information.service';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';
import { InformationForCreate } from './dto/informationforcreate.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('information')
export class InformationController {
  constructor(private informationService: InformationService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
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
  async createInformation(
    @Body()
    informationForCreate: InformationForCreate,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file != undefined)
      informationForCreate.img_path =
        'http://194.62.19.52:7000/' + file?.path?.split('\\')[1];
    return await this.informationService.createInformation(
      informationForCreate,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
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
  async updateInformation(
    @Param('id') informationId: string,
    @Body()
    informationForUpdate: any,
    @UploadedFile() file: any,
  ) {
    if (file != undefined)
      return await this.informationService.updateInformation(
        informationId,
        informationForUpdate,
        'http://194.62.19.52:7000/' + file.path.split('\\')[1],
      );
    else
      return await this.informationService.updateInformationWithoutPicture(
        informationId,
        informationForUpdate,
      );
  }

  @Get()
  async getAllinformations(@Query('prod') prod: string) {
    if (prod != '' && prod != undefined && prod != null)
      return await this.informationService.findByProduct(prod);
    return await this.informationService.getAll();
  }
  @Get('/:id')
  async getInformation(@Param('id') id: string) {
    return await this.informationService.getOne(id);
  }

  @Delete('/')
  async deleteInformationByProductAndName(@Query('prod') prod: string) {
    return await this.informationService.deleteInformationByProduct(prod);
  }

  @Delete('/:id')
  async deleteInformation(@Param('id') id: string) {
    return await this.informationService.deleteInformation(id);
  }
}
