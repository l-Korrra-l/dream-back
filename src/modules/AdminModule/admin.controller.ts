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
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @Delete('/user/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUserByAdmin(@Param('id') userId) {
    await this.adminService.deleteUser(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @Delete('/productd/:id')
  @HttpCode(HttpStatus.OK)
  async deleteProductByAdmin(@Param('id') productId) {
    await this.adminService.deleteProduct(productId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @Delete('/review/:id')
  @HttpCode(HttpStatus.OK)
  async deleteReviewByAdmin(@Param('id') recordId) {
    await this.adminService.deleteReview(recordId);
  }
}
