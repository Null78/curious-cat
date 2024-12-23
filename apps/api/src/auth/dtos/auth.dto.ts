import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  access_token: string;

  constructor(partial: Partial<AuthDto>) {
    Object.assign(this, partial);
  }
}