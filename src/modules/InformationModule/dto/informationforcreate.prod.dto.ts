import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InformationForCreateFromProd {
  @ApiPropertyOptional({ default: 'gray' })
  color: string;
  @ApiPropertyOptional({
    default: 'http://194.62.19.52:7000/s20_ultra_quandt_1-600x600.jpg',
  })
  img_path: string;
  @ApiProperty({ default: 'тестовое описание товара' })
  text: string;
}
