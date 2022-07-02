import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/AuthModule/auth.module';
import { AdminModule } from './modules/AdminModule/admin.module';
import { DbModule } from './persistance/dbmodule.module';
import { UserModule } from './modules/UserModule/user.module';
import { ProductModule } from './modules/ProductModule/product.module';
import { BucketModule } from './modules/BucketModule/bucket.module';
import { OrderModule } from './modules/OrderModule/order.module';
import { EmailModule } from './modules/EmailModule/email.module';
import { CurrencyModule } from './modules/Currencymodule/currency.module';
import { SliderModule } from './modules/SliderModule/slider.module';
import { CategoryModule } from './modules/CategoryModule/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';
import { ServiceModule } from './modules/ServiceModule/service.module';
import { FrontendMiddleware } from './middlewares/index.middleware';
import { routes } from 'src/routes/routes';
import { RouterModule } from 'nest-router';
import { ColorModule } from './modules/ColorModule/color.module';
import { MemoryModule } from './modules/MemoryModule/memory.module';
import { MaterialModule } from './modules/MaterialModule/material.module';
import { CharacteristicModule } from './modules/CharacteristicModule/characteristic.module';
import { CharactValueModule } from './modules/CharactValueModule/charactValue.module';
import { SectionModule } from './modules/SectionModule/section.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot(
      (() => {
        const publicDir = resolve('./public');
        const servePath = '/files';

        return {
          rootPath: publicDir,
          serveRoot: servePath,
          exclude: ['/api/'],
        };
      })(),
    ),
    RouterModule.forRoutes(routes),
    DbModule,
    AuthModule,
    AdminModule,
    UserModule,
    ProductModule,
    BucketModule,
    OrderModule,
    EmailModule,
    CurrencyModule,
    SliderModule,
    CategoryModule,
    ServiceModule,
    ColorModule,
    MemoryModule,
    MaterialModule,
    CharacteristicModule,
    CharactValueModule,
    SectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FrontendMiddleware).forRoutes({
      path: '/**',
      method: RequestMethod.ALL,
    });
  }
}
