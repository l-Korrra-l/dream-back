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
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from '../AuthModule/guards/jwt.guard';
import { RolesGuard } from '../AuthModule/guards/roles.guard';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private sectionService: SectionService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createSection(
    @Body()
    sectionForCreate: any,
  ) {
    return await this.sectionService.createSection(sectionForCreate);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async updateSection(
    @Param('id') sectionId: string,
    @Body()
    sectionForUpdate: any,
  ) {
    return await this.sectionService.updateSection(sectionId, sectionForUpdate);
  }

  @Get('/')
  async getSectionByName(@Query('name') name: string) {
    if (name != null && name != undefined && name != '')
      return await this.sectionService.findByValue(name);
    else return await this.sectionService.getAll();
  }

  @Get('/:id')
  async getSection(@Param('id') id: string) {
    return await this.sectionService.getOne(id);
  }

  @Delete('/')
  async deleteSectionByName(@Query('name') name: string) {
    return await this.sectionService.deleteSectionByName(name);
  }

  @Delete('/:id')
  async deleteSection(@Param('id') id: string) {
    return await this.sectionService.deleteSection(id);
  }
}
