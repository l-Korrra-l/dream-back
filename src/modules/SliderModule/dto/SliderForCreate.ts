/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SliderForCreate {
  @ApiPropertyOptional()
  prodId?: number;
  @ApiPropertyOptional()
  title?: string;
  @ApiPropertyOptional()
  description?: string;
  @ApiPropertyOptional()
  img_path?: string;
}
