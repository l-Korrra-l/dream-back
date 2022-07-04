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
import { InformationService } from '../InformationModule/information.service';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private charactValueService: CharactValueService,
    private colorService: ColorService,
    private memoryService: MemoryService,
    private materialService: MaterialService,
    private informationService: InformationService,
  ) {}

  @ApiOperation({ summary: 'добавить продукт' })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
 
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
    @Body()
    productForCreate: ProductForCreate,
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
      information,
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

    information?.map((c) => {
      this.informationService.createInformation({ prodId: prod.id, ...c });
    });

    return prod;
  }

  @ApiOperation({ summary: 'получить все продукты' })
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

  @ApiOperation({ summary: 'поиск продукта по фильтрам' })
  @Post('search')
  async searchProductss(
    @Sorting() sort: Sort,
    @SortingBy() sortby: string,
    @Body() filters: any,
    @Query('name') name: string,
    @Query('text') text: string,
    @Query('minprice') min_price: string,
    @Query('maxprice') max_price: string,
    @Query('producer') producer: string,
  ) {
    filters.name = name;
    filters.text = text;
    filters.min_price = min_price;
    filters.max_price = max_price;
    filters.producer = producer;
    return await this.productService.findByFilters(filters, sort, sortby);
  }

  @ApiOperation({ summary: 'оставить отзыв на продукт по id' })
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

  @ApiOperation({ summary: 'изменить продукт по id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @ApiOperation({ summary: 'получить продукт по id' })
  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const prod = await this.productService.getOne(id);
    const characteristic = (
      await this.charactValueService.findByProductGroupbyValue(id)
    ).map((i) => {
      if (i.characteristic.section != null)
        return {
          name: i.characteristic.name,
          value: i.value,
          section: i.characteristic.section.value,
        };
      else
        return {
          name: i.characteristic.name,
          value: i.value,
          section: 'Другое',
        };
    });

    const charact: any = characteristic.reduce(
      (r, { section: name, ...object }) => {
        let temp = r.find((o) => o.name === name);
        if (!temp) r.push((temp = { name, children: [] }));
        temp.children.push(object);
        return r;
      },
      [],
    );
    const color = await this.colorService.findByProduct(prod.id);
    const colors: any = color.reduce(
      (r, { color: name, color_code, ...object }) => {
        let temp = r.find((o) => o.name === name);
        if (!temp) r.push((temp = { name, color_code, img_path: [] }));
        temp.img_path.push(object.img_path);
        return r;
      },
      [],
    );

    return {
      product: prod,
      characts: charact,
      colors: colors,
    };
  }
}
