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
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from '../AuthModule/guards/jwt.guard';
import { RolesGuard } from '../AuthModule/guards/roles.guard';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private sectionService: SectionService) {}

  @ApiOperation({ summary: 'добавить раздел описания' })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
 
  @ApiBearerAuth('access-token')
  async createSection(
    @Body()
    sectionForCreate: any,
  ) {
    return await this.sectionService.createSection(sectionForCreate);
  }

  @ApiOperation({
    summary: 'изменить раздел описания по id',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
 
  @ApiBearerAuth('access-token')
  @Patch(':id')
  async updateSection(
    @Param('id') sectionId: string,
    @Body()
    sectionForUpdate: any,
  ) {
    return await this.sectionService.updateSection(sectionId, sectionForUpdate);
  }

  @ApiOperation({
    summary:
      'получить разделы описания по имени, либо все',
  })
  @Get('/')
  async getSectionByName(@Query('name') name: string) {
    if (name != null && name != undefined && name != '')
      return await this.sectionService.findByValue(name);
    else return await this.sectionService.getAll();
  }

  @ApiOperation({
    summary: 'получить раздел описания по id',
  })
  @Get('/:id')
  async getSection(@Param('id') id: string) {
    return await this.sectionService.getOne(id);
  }

  @ApiOperation({
    summary: 'удалить раздел описания по имени',
  })
  @Delete('/')
  async deleteSectionByName(@Query('name') name: string) {
    return await this.sectionService.deleteSectionByName(name);
  }

  @ApiOperation({
    summary: 'удалить раздел описания по id',
  })
  @Delete('/:id')
  async deleteSection(@Param('id') id: string) {
    return await this.sectionService.deleteSection(id);
  }
}
