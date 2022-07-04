import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MemoryForCreateFromProd {
  @ApiProperty({ default: 21 })
  prodId: number;
  @ApiProperty({ default: '128 ��' })
  size: string;
}
