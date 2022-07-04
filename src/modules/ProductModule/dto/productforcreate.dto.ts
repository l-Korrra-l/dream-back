import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';
import { array } from 'joi';
import { CharacteristicValueForCreate } from 'src/modules/CharactValueModule/dto/characteristicvalueforcreate.dto';
import { CharacteristicValueForCreateFromProd } from 'src/modules/CharactValueModule/dto/characteristicvalueforcreate.prod.dto';
import { ColorForCreateFromProd } from 'src/modules/ColorModule/dto/colorforcreate.prod.dto';
import { InformationForCreateFromProd } from 'src/modules/InformationModule/dto/informationforcreate.prod.dto';
import { MaterialForCreateFromProd } from 'src/modules/MaterialModule/dto/materailforcreate.prod.dto';
import { MemoryForCreateFromProd } from 'src/modules/MemoryModule/dto/memoryforcreate.prod.dto';

export class ProductForCreate {
  @ApiProperty({ default: 'Samsung Galaxy S20 Ultra' })
  name: string;
  @ApiPropertyOptional({ default: 'Смартфон Samsung Galaxy S20 Ultra' })
  short_descr?: string;
  @ApiPropertyOptional({ default: 'Смартфон Samsung Galaxy S20 Ultra' })
  description?: string;
  @ApiPropertyOptional({ default: 'Samsung' })
  producer?: string;
  @ApiProperty({ default: 100 })
  price: number;
  @ApiProperty({ default: 20 })
  in_stock: number;
  @ApiPropertyOptional({
    default:
      'http://194.62.19.52:7000/Samsung-Galaxy-S20+-Ultra-on-transparent-background-PNG.png',
  })
  img_path?: string;
  @ApiProperty({ default: 3 })
  categoryId: number;
  @ApiPropertyOptional()
  subcategoryId: number;
  @ApiPropertyOptional({ default: 0 })
  raiting: Decimal;

  @ApiPropertyOptional({ type: [CharacteristicValueForCreateFromProd] })
  characteristics: CharacteristicValueForCreateFromProd[];
  @ApiPropertyOptional({ type: [ColorForCreateFromProd] })
  colors: ColorForCreateFromProd[];
  @ApiPropertyOptional({ type: [MaterialForCreateFromProd] })
  materials: MaterialForCreateFromProd[];
  @ApiPropertyOptional({ type: [MemoryForCreateFromProd] })
  memory: MemoryForCreateFromProd[];
  @ApiPropertyOptional({ type: [InformationForCreateFromProd] })
  information: InformationForCreateFromProd[];
}
