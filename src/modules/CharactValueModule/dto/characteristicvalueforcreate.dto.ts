import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';

export class CharacteristicValueForCreate {
  @ApiProperty({ default: 21 })
  prodId: number;
  @ApiProperty({ default: 21 })
  charactId: number;
  @ApiProperty({ default: 'test value' })
  value: string;
}
