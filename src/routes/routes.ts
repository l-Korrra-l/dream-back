import { Routes } from 'nest-router';
import { AdminModule } from 'src/modules/AdminModule/admin.module';
import { AuthModule } from 'src/modules/AuthModule/auth.module';
import { BucketModule } from 'src/modules/BucketModule/bucket.module';
import { CategoryModule } from 'src/modules/CategoryModule/category.module';
import { ColorModule } from 'src/modules/ColorModule/color.module';
import { CurrencyModule } from 'src/modules/Currencymodule/currency.module';
import { EmailModule } from 'src/modules/EmailModule/email.module';
import { OrderModule } from 'src/modules/OrderModule/order.module';
import { ProductModule } from 'src/modules/ProductModule/product.module';
import { ServiceModule } from 'src/modules/ServiceModule/service.module';
import { SliderModule } from 'src/modules/SliderModule/slider.module';
import { UserModule } from 'src/modules/UserModule/user.module';
import { DbModule } from 'src/persistance/dbmodule.module';

export const routes: Routes = [
  {
    path: '/api',
    module: DbModule,
  },
  {
    path: '/api',
    module: AuthModule,
  },
  {
    path: '/api',
    module: AdminModule,
  },
  {
    path: '/api',
    module: UserModule,
  },
  {
    path: '/api',
    module: ProductModule,
  },
  {
    path: '/api',
    module: BucketModule,
  },
  {
    path: '/api',
    module: OrderModule,
  },
  {
    path: '/api',
    module: EmailModule,
  },

  {
    path: '/api',
    module: ServiceModule,
  },
  {
    path: '/api',
    module: CategoryModule,
  },
  {
    path: '/api',
    module: SliderModule,
  },
  {
    path: '/api',
    module: CurrencyModule,
  },
  {
    path: '/api',
    module: ColorModule,
  },
];
