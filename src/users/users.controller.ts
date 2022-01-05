import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Post()
  create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }
}
