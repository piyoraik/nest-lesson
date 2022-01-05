import { IsString, MaxLength, MinLength } from 'class-validator';
import { User } from '../interface/user.interface';

export class CreateUserDto implements User {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly username!: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password!: string;
  @IsString()
  @MinLength(1)
  readonly description!: string;
}
