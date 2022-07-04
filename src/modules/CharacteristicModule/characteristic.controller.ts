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
import { CharacteristicService } from './characteristic.service';

@Controller('characteristic')
export class CharacteristicController {
  constructor(private characteristicService: CharacteristicService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
 
  @ApiBearerAuth('access-token')
  async createCharacteristic(
    @Body()
    characteristicForCreate: any,
  ) {
    return await this.characteristicService.createCharacteristic(
      characteristicForCreate,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
 
  @ApiBearerAuth('access-token')
  @Patch(':id')
  async updateCharacteristic(
    @Param('id') characteristicId: string,
    @Body()
    characteristicForUpdate: any,
  ) {
    return await this.characteristicService.updateCharacteristic(
      characteristicId,
      characteristicForUpdate,
    );
  }

  @ApiOperation({
    summary:
      'получить характеристику по имени, либо все',
  })
  @Get()
  async getCharacteristicByName(@Query('name') name: string) {
    if (name != null && name != undefined && name != '')
      return await this.characteristicService.findByValue(name);
    else return await this.characteristicService.getAll();
  }

  @ApiOperation({
    summary: 'получить характеристику по id',
  })
  @Get('/:id')
  async getCharacteristic(@Param('id') id: string) {
    return await this.characteristicService.getOne(id);
  }

  @ApiOperation({
    summary: 'удалить характеристику по имени',
  })
  @Delete('/')
  async deleteCharacteristicByName(@Query('name') name: string) {
    return await this.characteristicService.deleteCharacteristicByName(name);
  }

  @ApiOperation({
    summary: 'получить характеристику по id',
  })
  @Delete('/:id')
  async deleteCharacteristic(@Param('id') id: string) {
    return await this.characteristicService.deleteCharacteristic(id);
  }
}
