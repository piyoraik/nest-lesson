import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async login(user: CreateUserDto) {
    const payload = { username: user.username };
    return {
      'access-token': this.jwtService.sign(payload),
    };
  }
}
