import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from '../AuthModule/guards/jwt.guard';
import { RolesGuard } from '../AuthModule/guards/roles.guard';
import { BucketForCreate } from './dto/bucketforcreate.dto';
import { BucketService } from './bucket.service';

@Controller('bucket')
export class BucketController {
  constructor(private bucketService: BucketService) {}

  // @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.User)
  // async createBucket(bucketForCreate: BucketForCreate) {
  //   return await this.bucketService.createBucket(bucketForCreate);
  // }

  // @Get('/:id')
  // async getBucket(@Param('id') id: string) {
  //   return await this.bucketService.getOne(id);
  // }

  // @Get()
  // async getAllBuckets() {
  //   return await this.bucketService.getAll();
  // }

  // @Get('search/:value')
  // async searchBuckets(@Param('value') valueForSearch: string) {
  //   const name = valueForSearch;
  //   const author = valueForSearch;

  //   return await this.bucketService.findByOrder(orderId);
  // }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.User)
  // @Patch(':id')
  // async updateBucket(
  //   @Param('id') buckettId: string,
  //   // @Body(new JoiValidationPipe(productForUpdateSchema))
  //   bucketForUpdate: BucketForUpdate,
  // ) {
  //   return await this.bucketService.updateProduct(
  //     bucketId,
  //     bucketForUpdate,
  //   );
  // }
}
