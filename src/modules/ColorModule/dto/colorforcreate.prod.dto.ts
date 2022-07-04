import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';
import { CharacteristicValueForCreate } from 'src/modules/CharactValueModule/dto/characteristicvalueforcreate.dto';

export class ColorForCreateFromProd {
  @ApiProperty({ default: 'gray' })
  color: string;
  @ApiPropertyOptional({ default: '#c6c6c6' })
  color_code: string;
  @ApiPropertyOptional({
    default: 'http://194.62.19.52:7000/s20_ultra_quandt_1-600x600.jpg',
  })
  img_path: string;
}
