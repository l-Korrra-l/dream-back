import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';

export class BucketForCreate {
  @ApiProperty()
  orderId: string;
  @ApiProperty()
  prodId: string;
  @ApiProperty()
  quantity: number;
}
