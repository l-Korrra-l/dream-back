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
import { CharactValueService } from '../CharactValueModule/charactValue.service';
import { ColorService } from '../ColorModule/color.service';
import { MemoryService } from '../MemoryModule/memory.service';
import { MaterialService } from '../MaterialModule/material.service';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private charactValueService: CharactValueService,
    private colorService: ColorService,
    private memoryService: MemoryService,
    private materialService: MaterialService,
  ) {}

  @Post()
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
  async createProduct(
    // @Body()
    // productForCreate: ProductForCreate,
    @Body()
    productForCreate: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file != undefined)
      productForCreate.img_path =
        'http://194.62.19.52:7000/' + file?.path?.split('\\')[1];
    const {
      in_stock,
      categoryId,
      characteristics,
      colors,
      materials,
      memory,
      ...lprod
    } = productForCreate;
    // subcategoryId,

    const prod = await this.productService.createProduct({
      in_stock: parseInt(in_stock.toString()),
      categoryId: parseInt(categoryId.toString()),
      // subcategoryId: parseInt(subcategoryId.toString()),
      ...lprod,
    });

    characteristics?.map((c) => {
      this.charactValueService.createCharactValue({ prodId: prod.id, ...c });
    });

    colors?.map((c) => {
      this.colorService.createColor({ prodId: prod.id, ...c });
    });

    materials?.map((c) => {
      this.materialService.createMaterial({ prodId: prod.id, ...c });
    });

    memory?.map((c) => {
      this.memoryService.createMemory({ prodId: prod.id, ...c });
    });

    const characteristic = await this.charactValueService.findByProduct(
      prod.id.toString(),
    );

    return { prod: prod, characts: characteristic };
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
    if (file != undefined)
      return await this.productService.updateProduct(
        productId,
        productForUpdate,
        'http://194.62.19.52:7000/' + file.path.split('\\')[1],
      );
    else
      return await this.productService.updateProductWithoutImage(
        productId,
        productForUpdate,
      );
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const prod = await this.productService.getOne(id);
    const characteristic = await this.charactValueService.findByProduct(
      prod.id.toString(),
    );
    const colors = await this.colorService.findByProduct(prod.id.toString());
    const memory = await this.memoryService.findByProduct(prod.id.toString());
    const material = await this.materialService.findByProduct(
      prod.id.toString(),
    );

    return {
      product: prod,
      characts: characteristic,
      color: colors,
      memory: memory,
      material: material,
    };
  }
}
