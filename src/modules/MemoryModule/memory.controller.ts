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
import { MemoryService } from './memory.service';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';
import { MemoryForCreate } from './dto/memoryforcreate.dto';

@Controller('memory')
export class MemoryController {
  constructor(private memoryService: MemoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createMemory(
    @Body()
    memoryForCreate: MemoryForCreate,
  ) {
    return await this.memoryService.createMemory(memoryForCreate);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async updateMemory(
    @Param('id') memoryId: string,
    @Body()
    memoryForUpdate: any,
  ) {
    return await this.memoryService.updateMemory(memoryId, memoryForUpdate);
  }

  @Get()
  async getAllmemorys(@Query('prod') prod: string) {
    if (prod != '' && prod != undefined && prod != null)
      return await this.memoryService.findByProduct(prod);
    return await this.memoryService.getAll();
  }
  @Get('/:id')
  async getMemory(@Param('id') id: string) {
    return await this.memoryService.getOne(id);
  }

  @Delete('/')
  async deleteMemoryByProductAndName(
    @Query('prod') prod: string,
    @Query('name') name: string,
  ) {
    if (name != null && name != undefined)
      return await this.memoryService.deleteMemoryByProductAndName(prod, name);
    return await this.memoryService.deleteMemoryByProduct(prod);
  }

  @Delete('/:id')
  async deleteMemory(@Param('id') id: string) {
    return await this.memoryService.deleteMemory(id);
  }
}
