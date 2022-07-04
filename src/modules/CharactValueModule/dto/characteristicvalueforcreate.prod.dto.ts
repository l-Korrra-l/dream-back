import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';

export class CharacteristicValueForCreateFromProd {
  @ApiProperty({ default: 21 })
  charactId: number;
  @ApiProperty({ default: 'test value' })
  value: string;
}
