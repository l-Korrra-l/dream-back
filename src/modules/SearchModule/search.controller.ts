import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from '../AuthModule/guards/jwt.guard';
import { RolesGuard } from '../AuthModule/guards/roles.guard';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private SearchService: SearchService) {}

  // Get();
  // async commonSearch(@Param('text') text: string) {
  //   return await this.sectionService.updateSection(sectionId, sectionForUpdate);
  // }
}
