import { ApiProperty } from '@nestjs/swagger';
import { Bucket } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class OrderForCreate {
  @ApiProperty() buckets: Bucket[];
}
