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
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';
import { ApiBearerAuth } from '@nestjs/swagger';
import EmailService from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}
  @Post()
  async SendMail(
    @Body()
    options: any,
  ) {
    return await this.emailService.sendMail(options);
  }
}
