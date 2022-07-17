import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';

export class ServiceForUpdate {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  img_path: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  raiting?: number;
  @ApiProperty()
  short_descr?: string;
  @ApiPropertyOptional()
  prod_ids: number[];
}
