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
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';
import { OrderService } from './order.service';
import { OrderForCreate } from './dto/OrderForCreate';
import { ApiOperation } from '@nestjs/swagger';
import EmailService from '../EmailModule/email.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private emailservice: EmailService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'добавление заказа массив корзин {buckets: {prodid:, quantity:}}',
  })
  async createProduct(
    @CurrentUser()
    user: CurrentUserInfo,
    @Body()
    orderForCreate: OrderForCreate,
  ) {
    this.emailservice.sendMail({
      to: user.email,
      subject: 'Dreamstore заказ',
      text: 'Ваш заказ оформлен',
    });
    return await this.orderService.createOrder(orderForCreate, user.userId);
  }

  @ApiOperation({ summary: 'получить заказ по id' })
  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getOne(id);
  }

  @Get()
  @ApiOperation({
    summary:
      'все заказы текущего пользователя, либо все для неавторизованного/админа',
  })
  async getAllproducts(@CurrentUser() user: CurrentUserInfo) {
    return await this.orderService.getAll(user);
  }

  // @Get('search/:value')
  // async searchProducts(@Param('value') valueForSearch: string) {
  //   const name = valueForSearch;
  //   const author = valueForSearch;

  //   return await this.productService.findByValue(name, author);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('makereview/:productId')
  // @HttpCode(HttpStatus.CREATED)
  // async makeReviewForProduct(
  //   @Param('productId') productId,
  //   @CurrentUser() currentUser: CurrentUserInfo,
  //   @Body(new JoiValidationPipe(reviewFromUserSchema)) review: ReviewFromUser,
  // ) {
  //   return await this.productService.makeReview(
  //     currentUser.userId,
  //     currentUser.email,
  //     productId,
  //     review,
  //   );
  // }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: 'public',
  //     }),
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // @Patch(':id')
  // async updateProduct(
  //   @Param('id') productId: string,
  //   // @Body(new JoiValidationPipe(productForUpdateSchema))
  //   productForUpdate: ProductForUpdate,
  //   @UploadedFile() file: any,
  // ) {
  //   return await this.productService.updateProduct(
  //     productId,
  //     productForUpdate,
  //     file.path.split('\\')[1] + '.' + file.originalname.split('.')[1],
  //   );
  // }
}
