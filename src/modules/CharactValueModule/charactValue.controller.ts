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
import { CharactValueService } from './charactValue.service';

@Controller('charactvalue')
export class CharactValueController {
  constructor(private charactvalueService: CharactValueService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createCharactValue(
    // @Body()
    // charactvalueForCreate: CharactValueForCreate,
    @Body()
    charactvalueForCreate: any,
  ) {
    return await this.charactvalueService.createCharactValue(
      charactvalueForCreate,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async updateCharactValue(
    @Param('id') charactvalueId: string,
    @Body()
    charactvalueForUpdate: any,
  ) {
    return await this.charactvalueService.updateCharactValue(
      charactvalueId,
      charactvalueForUpdate,
    );
  }

  
  @Get()
  async getAllcharactvalues(@Query('prod') prod: string) {
    if (prod != '' && prod != undefined && prod != null)
      return await this.charactvalueService.findByProduct(prod);
    return await this.charactvalueService.getAll();
  }
  @Get('/:id')
  async getCharactValue(@Param('id') id: string) {
    return await this.charactvalueService.getOne(id);
  }

  @Delete('/')
  async deleteCharactValueByProductAndName(
    @Query('prod') prod: string,
    @Query('value') name: string,
  ) {
    if (name != null && name != undefined)
      return await this.charactvalueService.deleteCharactValueByProductAndValue(
        prod,
        name,
      );
    return await this.charactvalueService.deleteCharactValueByProduct(prod);
  }

  @Delete('/:id')
  async deleteCharactValue(@Param('id') id: string) {
    return await this.charactvalueService.deleteCharactValue(id);
  }
}
