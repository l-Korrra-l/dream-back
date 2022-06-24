import {
  Body,
  Controller,
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
import { SortingBy } from 'src/decorators/sortbyheader.decorator';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public',
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createProduct(
    // @Body()
    // productForCreate: ProductForCreate,
    @Body()
    productForCreate: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(productForCreate);
    console.log(file);
    if (file != undefined)
      productForCreate.img_path = file?.path?.split('\\')[1];
    console.log(productForCreate.in_stock);
    const { in_stock, categoryId, ...lprod } = productForCreate;
    return await this.productService.createProduct({
      in_stock: parseInt(in_stock.toString()),
      categoryId: parseInt(categoryId.toString()),
      ...lprod,
    });
  }

  @Get()
  async getAllproducts(@Sorting() sort: Sort, @SortingBy() sortby: string) {
    return await this.productService.getAll(sort, sortby);
  }

  // @Get('search/:value')
  // async searchProducts(@Param('value') valueForSearch: string) {
  //   console.log('here');
  // const name = valueForSearch;
  // const author = valueForSearch;

  // return await this.productService.findByValue(name, author);
  // }

  @Post('search')
  async searchProductss(
    @Sorting() sort: Sort,
    @SortingBy() sortby: string,
    @Body() filters: any,
  ) {
    return await this.productService.findByFilters(filters, sort, sortby);
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
        destination: 'public',
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    // @Body()
    // productForUpdate: ProductForUpdate,
    @Body()
    productForUpdate: any,
    @UploadedFile() file: any,
  ) {
    return await this.productService.updateProduct(
      productId,
      productForUpdate,
      file.path.split('\\')[1] + '.' + file.originalname.split('.')[1],
    );
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    return await this.productService.getOne(id);
  }
}
