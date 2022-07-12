import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';

export class SubcategoryForCreate {
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  categoryId?: number;
}
