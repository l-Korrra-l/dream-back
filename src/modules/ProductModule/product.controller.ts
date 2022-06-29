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
    const prods = await this.productService.getAll(sort, sortby);
    if (prods.length < 1) {
      this.productService.createProduct({
        name: 'iPhone 13',
        short_descr: 'Смартфон APPLE iPhone 13 Blue',
        description: 'Смартфон APPLE iPhone 13 Blue',
        producer: 'Apple',
        price: '400',
        charact: null,
        in_stock: 3,
        img_path:
          'http://localhost:7000/files/f3b50542-041d-4b7b-b940-ec0c3453897a.png',
        categoryId: 1,
        subcategoryId: null,
        raiting: 0,
        rel_date: '2022',
        storage: null,
        camera_matrix: '12 мегапикселей',
        photo_resolution: '4032 x 3024',
        zoom: 'Цифровой',
        stabilization: 'Оптическая',
        camera_c_lens: '2 (12 МП + 12 МП)',
        wifi_version: 'Wi-Fi 6 (802.11 a/b/g/n/ac/ax)',
        nfc: true,
        operation_system: null,
        os_version: null,
        display_size: 6.11,
        display_resolution: '2532x1170',
        display_tecnology: null,
        display_protection: null,
        display_matrix: null,
        display_type: 'Super Retina XDR (OLED)',
        weight: '174 грамма',
        heigth: '146.7 мм',
        width: '71.5 мм',
        thickness: '7.65 мм',
        sim: '2 nano',
        class: 'Флагман',
        sim_type: 'Nano',
        sensors:
          '- Барометр\n- Датчик приближения\n- Гироскоп\n- Акселерометр\n- Датчик света\n- Компас\n- Сканер распознавания лица',
        chipset: 'Apple A15 Bionic',
        card_slot: null,
        internal_memory: '128 ГБ, 268 ГБ, 512 ГБ',
        camera: null,
        video: null,
        battery_type: 'Литий-ионный (Li-Ion)',
        battery_charging: '20 Вт',
        battery_life: null,
        battery_capacity: '3227 мАч',
        battery: null,
        shell_material: null,
        cover_material: null,
        back_panel_material: 'стекло',
        fingers_scaner: false,
        equipment:
          '- Смартфон\n- Кабель Lightning\n- Скрепка для извлечения SIM\n- Краткое руководство пользователя',
        marks: null,
        max_frequency: '3200 МГц',
        os: 'iOS 15 (С обновлением до iOS 15.2)',
        ram: '4 ГБ',
        flash_memory: null,
        buitInCamera: null,
        c_matrixdotts: null,
        childish: null,
        bracelet_material: null,
        bracelet_color: null,
        mp3_player: null,
        app_store: null,
        alarms: null,
        calls: null,
        voice_control: null,
        contactless_paymet: null,
        waterproof: null,
        touch_screen: null,
        GPS: null,
        wireless_charger: 'Да (7.5 Вт)',
        fast_charging: 'Да (54% за 30 минут)',
        processor: null,
        graphic_accelerator: null,
        scratch_protection: null,
        dynamics: 'Стерео',
        audio_port_3: false,
        dolby_atmos: true,
        max_volume: '83.2 дБ',
        Bluetooth: '5',
        usb_type: null,
        cores_number: null,
        clock_frequency: '60 Гц',
        turbo_frequency: null,
        tdp: null,
        display_characteristics: null,
        ram_type: null,
        ram_frequency: '2133 МГц',
        memory_slots: null,
        drive_type: null,
        storage_capacity: null,
        odd: null,
        memory_card: null,
        discrete_graphics: null,
        graphics_card: null,
        condition_: 'новый',
      });
      this.productService.createProduct({
        name: 'iPhone 14',
        short_descr: 'Смартфон APPLE iPhone 14 Blue',
        description: 'Смартфон APPLE iPhone 14 Blue',
        producer: 'Apple',
        price: '400',
        charact: null,
        in_stock: 3,
        img_path:
          'http://localhost:7000/files/f3b50542-041d-4b7b-b940-ec0c3453897a.png',
        categoryId: 1,
        subcategoryId: null,
        raiting: 0,
        rel_date: '2022',
        storage: null,
        camera_matrix: '12 мегапикселей',
        photo_resolution: '4032 x 3024',
        zoom: 'Цифровой',
        stabilization: 'Оптическая',
        camera_c_lens: '2 (12 МП + 12 МП)',
        wifi_version: 'Wi-Fi 6 (802.11 a/b/g/n/ac/ax)',
        nfc: true,
        operation_system: null,
        os_version: null,
        display_size: 6.11,
        display_resolution: '2532x1170',
        display_tecnology: null,
        display_protection: null,
        display_matrix: null,
        display_type: 'Super Retina XDR (OLED)',
        weight: '174 грамма',
        heigth: '146.7 мм',
        width: '71.5 мм',
        thickness: '7.65 мм',
        sim: '2 nano',
        class: 'Флагман',
        sim_type: 'Nano',
        sensors:
          '- Барометр\n- Датчик приближения\n- Гироскоп\n- Акселерометр\n- Датчик света\n- Компас\n- Сканер распознавания лица',
        chipset: 'Apple A15 Bionic',
        card_slot: null,
        internal_memory: '128 ГБ, 268 ГБ, 512 ГБ',
        camera: null,
        video: null,
        battery_type: 'Литий-ионный (Li-Ion)',
        battery_charging: '20 Вт',
        battery_life: null,
        battery_capacity: '3227 мАч',
        battery: null,
        shell_material: null,
        cover_material: null,
        back_panel_material: 'стекло',
        fingers_scaner: false,
        equipment:
          '- Смартфон\n- Кабель Lightning\n- Скрепка для извлечения SIM\n- Краткое руководство пользователя',
        marks: null,
        max_frequency: '3200 МГц',
        os: 'iOS 15 (С обновлением до iOS 15.2)',
        ram: '4 ГБ',
        flash_memory: null,
        buitInCamera: null,
        c_matrixdotts: null,
        childish: null,
        bracelet_material: null,
        bracelet_color: null,
        mp3_player: null,
        app_store: null,
        alarms: null,
        calls: null,
        voice_control: null,
        contactless_paymet: null,
        waterproof: null,
        touch_screen: null,
        GPS: null,
        wireless_charger: 'Да (7.5 Вт)',
        fast_charging: 'Да (54% за 30 минут)',
        processor: null,
        graphic_accelerator: null,
        scratch_protection: null,
        dynamics: 'Стерео',
        audio_port_3: false,
        dolby_atmos: true,
        max_volume: '83.2 дБ',
        Bluetooth: '5',
        usb_type: null,
        cores_number: null,
        clock_frequency: '60 Гц',
        turbo_frequency: null,
        tdp: null,
        display_characteristics: null,
        ram_type: null,
        ram_frequency: '2133 МГц',
        memory_slots: null,
        drive_type: null,
        storage_capacity: null,
        odd: null,
        memory_card: null,
        discrete_graphics: null,
        graphics_card: null,
        condition_: 'новый',
      });
      this.productService.createProduct({
        name: 'Samsumg 14',
        short_descr: 'Смартфон APPLE Samsumg 14 Blue',
        description: 'Смартфон APPLE Samsumg 14 Blue',
        producer: 'Apple',
        price: '400',
        charact: null,
        in_stock: 3,
        img_path:
          'http://localhost:7000/files/f3b50542-041d-4b7b-b940-ec0c3453897a.png',
        categoryId: 1,
        rel_date: '2022',
        storage: null,
        camera_matrix: '12 мегапикселей',
        photo_resolution: '4032 x 3024',
        zoom: 'Цифровой',
        stabilization: 'Оптическая',
        camera_c_lens: '2 (12 МП + 12 МП)',
        wifi_version: 'Wi-Fi 6 (802.11 a/b/g/n/ac/ax)',
        nfc: true,
        operation_system: null,
        os_version: null,
        display_size: 6.11,
        display_resolution: '2532x1170',
        display_tecnology: null,
        display_protection: null,
        display_matrix: null,
        display_type: 'Super Retina XDR (OLED)',
        weight: '174 грамма',
        heigth: '146.7 мм',
        width: '71.5 мм',
        thickness: '7.65 мм',
        sim: '2 nano',
        class: 'Флагман',
        sim_type: 'Nano',
        sensors:
          '- Барометр\n- Датчик приближения\n- Гироскоп\n- Акселерометр\n- Датчик света\n- Компас\n- Сканер распознавания лица',
        chipset: 'Apple A15 Bionic',
        card_slot: null,
        internal_memory: '128 ГБ, 268 ГБ, 512 ГБ',
        camera: null,
        video: null,
        battery_type: 'Литий-ионный (Li-Ion)',
        battery_charging: '20 Вт',
        battery_life: null,
        battery_capacity: '3227 мАч',
        battery: null,
        shell_material: null,
        cover_material: null,
        back_panel_material: 'стекло',
        fingers_scaner: false,
        equipment:
          '- Смартфон\n- Кабель Lightning\n- Скрепка для извлечения SIM\n- Краткое руководство пользователя',
        marks: null,
        max_frequency: '3200 МГц',
        os: 'iOS 15 (С обновлением до iOS 15.2)',
        ram: '4 ГБ',
        flash_memory: null,
        buitInCamera: null,
        c_matrixdotts: null,
        childish: null,
        bracelet_material: null,
        bracelet_color: null,
        mp3_player: null,
        app_store: null,
        alarms: null,
        calls: null,
        voice_control: null,
        contactless_paymet: null,
        waterproof: null,
        touch_screen: null,
        GPS: null,
        wireless_charger: 'Да (7.5 Вт)',
        fast_charging: 'Да (54% за 30 минут)',
        processor: null,
        graphic_accelerator: null,
        scratch_protection: null,
        dynamics: 'Стерео',
        audio_port_3: false,
        dolby_atmos: true,
        max_volume: '83.2 дБ',
        Bluetooth: '5',
        usb_type: null,
        cores_number: null,
        clock_frequency: '60 Гц',
        turbo_frequency: null,
        tdp: null,
        display_characteristics: null,
        ram_type: null,
        ram_frequency: '2133 МГц',
        memory_slots: null,
        drive_type: null,
        storage_capacity: null,
        odd: null,
        memory_card: null,
        discrete_graphics: null,
        graphics_card: null,
        condition_: 'новый',
      });
      this.productService.createProduct({
        name: 'Samsumg 14',
        short_descr: 'Смартфон xiaomi Samsumg 14 Gray',
        description: 'Смартфон xiaomi Samsumg 14 Gray',
        producer: 'xiaomi',
        price: 600,
        in_stock: 3,
        img_path: 'http://localhost:7000/files/pms_1632297746.27263270.png',
        categoryId: 1,
        rel_date: '2022',
        camera_matrix: '12 мегапикселей',
        photo_resolution: '4032 x 3024',
        zoom: 'Цифровой',
        stabilization: 'Оптическая',
        camera_c_lens: '2 (12 МП + 12 МП)',
        wifi_version: 'Wi-Fi 6 (802.11 a/b/g/n/ac/ax)',
        nfc: true,
        display_size: 6.11,
        display_resolution: '2532x1170',
        display_tecnology: null,
        display_protection: null,
        display_matrix: null,
        display_type: 'Super Retina XDR (OLED)',
        weight: '174 грамма',
        heigth: '146.7 мм',
        width: '71.5 мм',
        thickness: '7.65 мм',
        sim: '2 nano',
        class: 'Флагман',
        sim_type: 'Nano',
        sensors:
          '- Барометр\n- Датчик приближения\n- Гироскоп\n- Акселерометр\n- Датчик света\n- Компас\n- Сканер распознавания лица',
        chipset: 'xiaomi A15 Bionic',
        card_slot: null,
        internal_memory: '128 ГБ, 268 ГБ, 512 ГБ',
        camera: null,
        video: null,
        battery_type: 'Литий-ионный (Li-Ion)',
        battery_charging: '20 Вт',
        battery_life: null,
        battery_capacity: '3227 мАч',
        battery: null,
        shell_material: null,
        cover_material: null,
        back_panel_material: 'стекло',
        fingers_scaner: false,
        equipment:
          '- Смартфон\n- Кабель Lightning\n- Скрепка для извлечения SIM\n- Краткое руководство пользователя',
        marks: null,
        max_frequency: '3200 МГц',
        os: 'iOS 15 (С обновлением до iOS 15.2)',
        ram: '4 ГБ',
        wireless_charger: 'Да (7.5 Вт)',
        fast_charging: 'Да (54% за 30 минут)',
        processor: null,
        graphic_accelerator: null,
        scratch_protection: null,
        dynamics: 'Стерео',
        audio_port_3: false,
        dolby_atmos: true,
        max_volume: '83.2 дБ',
        Bluetooth: '5',
        usb_type: null,
        cores_number: null,
        clock_frequency: '60 Гц',
        turbo_frequency: null,
        tdp: null,
        display_characteristics: null,
        ram_type: null,
        ram_frequency: '2133 МГц',
        memory_slots: null,
        drive_type: null,
        storage_capacity: null,
        odd: null,
        memory_card: null,
        discrete_graphics: null,
        graphics_card: null,
        condition_: 'новый',
      });
      return await this.productService.getAll(sort, sortby);
    }
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
