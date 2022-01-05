import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './interface/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly config: ConfigService,
  ) {}

  async create(user: CreateUserDto) {
    const salt = +this.config.get('SALT');
    const createdUser = new this.userModel({
      username: user.username,
      password: await hash(user.password, salt),
      description: user.description,
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

  async Update(inputUser: CreateUserDto) {
    const user = await this.userModel
      .findOne({ username: inputUser.username })
      .exec();
    if (!user) {
      throw new NotFoundException('Cloud Not find User');
    }
    user.description = inputUser.description;
    user.password = inputUser.password;
    return await user.save();
  }

  async Delete(username: string) {
    const user = await this.userModel.findOne({ username: username }).exec();
    if (!user) {
      throw new NotFoundException('Cloud Not find User');
    }
    return await user.deleteOne();
  }
}
