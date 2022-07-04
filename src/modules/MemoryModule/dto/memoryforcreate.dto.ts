import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';
import { CharacteristicValueForCreate } from 'src/modules/CharactValueModule/dto/characteristicvalueforcreate.dto';

export class MemoryForCreate {
  @ApiProperty({ default: 21 })
  prodId: number;
  @ApiProperty({ default: '128 ГБ' })
  size: string;
}
