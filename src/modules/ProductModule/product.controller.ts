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
import { Sorting } from 'src/decorators/sortheader.decorator';
import { Role } from 'src/enums/role.enum';
import { Sort } from 'src/enums/sort.enum';
import { CurrentUserInfo } from 'src/types/types';
import { JoiValidationPipe } from 'src/validation/joivalidation.pipe';
import { reviewFromUserSchema } from 'src/validation/schemas/reviewFromUser.schema';
import { JwtAuthGuard } from '../AuthModule/guards/jwt.guard';
import { RolesGuard } from '../AuthModule/guards/roles.guard';
import { ProductForCreate } from './dto/productforcreate.dto';
import { ProductForUpdate } from './dto/productforupdate.dto';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { ProductService } from './product.service';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/images',
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createProduct(
    // @Body(new JoiValidationPipe(productForCreateSchema))
    productForCreate: ProductForCreate,
    @UploadedFile() file: any,
  ) {
    productForCreate.img_path =
      file.path + '.' + file.originalname.split('.')[1];
    return await this.productService.createProduct(productForCreate);
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    return await this.productService.getOne(id);
  }

  @Get()
  async getAllproducts(@Sorting() sort: Sort) {
    return await this.productService.getAll(sort);
  }

  @Get('search/:value')
  async searchProducts(@Param('value') valueForSearch: string) {
    const name = valueForSearch;
    const author = valueForSearch;

    return await this.productService.findByValue(name, author);
  }

  @UseGuards(JwtAuthGuard)
  @Post('makereview/:productId')
  @HttpCode(HttpStatus.CREATED)
  async makeReviewForProduct(
    @Param('productId') productId,
    @CurrentUser() currentUser: CurrentUserInfo,
    @Body(new JoiValidationPipe(reviewFromUserSchema)) review: ReviewFromUser,
  ) {
    return await this.productService.makeReview(
      currentUser.userId,
      currentUser.email,
      productId,
      review,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/images',
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    // @Body(new JoiValidationPipe(productForUpdateSchema))
    productForUpdate: ProductForUpdate,
    @UploadedFile() file: any,
  ) {
    return await this.productService.updateProduct(
      productId,
      productForUpdate,
      file.path + '.' + file.originalname.split('.')[1],
    );
  }
}
