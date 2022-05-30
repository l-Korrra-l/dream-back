import { ApiProperty } from '@nestjs/swagger';

export class ReviewFromUser {
  @ApiProperty()
  text: string;
  @ApiProperty()
  raiting: number;
}
