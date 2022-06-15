import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';

export class CategoryForCreate {
  @ApiProperty()
  categoryName: string;
  @ApiPropertyOptional()
  img_path?: string;
  @ApiPropertyOptional()
  block_type?: string;
}
