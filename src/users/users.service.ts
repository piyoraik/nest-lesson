import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './interface/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user: CreateUserDto) {
    const createdUser = new this.userModel({
      username: user.username,
      password: user.password,
    });
    return await createdUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('Cloud not find User');
    }
    return user;
  }
}
