import { Routes } from 'nest-router';
import { AdminModule } from 'src/modules/AdminModule/admin.module';
import { AuthModule } from 'src/modules/AuthModule/auth.module';
import { BucketModule } from 'src/modules/BucketModule/bucket.module';
import { CategoryModule } from 'src/modules/CategoryModule/category.module';
import { CharacteristicModule } from 'src/modules/CharacteristicModule/characteristic.module';
import { CharactValueModule } from 'src/modules/CharactValueModule/charactValue.module';
import { ColorModule } from 'src/modules/ColorModule/color.module';
import { CurrencyModule } from 'src/modules/Currencymodule/currency.module';
import { DiscountModule } from 'src/modules/DiscountModule/discount.module';
import { DiscountSeasonModule } from 'src/modules/DiscountSeasonModule/discountSeason.module';
import { EmailModule } from 'src/modules/EmailModule/email.module';
import { InformationModule } from 'src/modules/InformationModule/information.module';
import { MaterialModule } from 'src/modules/MaterialModule/material.module';
import { MemoryModule } from 'src/modules/MemoryModule/memory.module';
import { OrderModule } from 'src/modules/OrderModule/order.module';
import { ProductModule } from 'src/modules/ProductModule/product.module';
import { SearchModule } from 'src/modules/SearchModule/seacrh.module';
import { SectionModule } from 'src/modules/SectionModule/section.module';
import { ServiceModule } from 'src/modules/ServiceModule/service.module';
import { SliderModule } from 'src/modules/SliderModule/slider.module';
import { SubcategoryModule } from 'src/modules/SubcategoryModule/subcategory.module';
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
    module: ServiceModule,
  },
  {
    path: '/api',
    module: CategoryModule,
  },
  {
    path: '/api',
    module: SubcategoryModule,
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
  {
    path: '/api',
    module: MemoryModule,
  },
  {
    path: '/api',
    module: MaterialModule,
  },
  {
    path: '/api',
    module: CharacteristicModule,
  },
  {
    path: '/api',
    module: CharactValueModule,
  },
  {
    path: '/api',
    module: SectionModule,
  },
  {
    path: '/api',
    module: InformationModule,
  },
  {
    path: '/api',
    module: DiscountModule,
  },
  {
    path: '/api',
    module: DiscountSeasonModule,
  },
  {
    path: '/api',
    module: SearchModule,
  },
  {
    path: '/api',
    module: EmailModule,
  },
];
