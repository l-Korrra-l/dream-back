import { ApiProperty } from '@nestjs/swagger';

export class UserForRegister {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  password: string;
}
