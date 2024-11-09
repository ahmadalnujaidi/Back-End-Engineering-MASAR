import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly dataSource: DataSource) {}

  // create user
  @Post()
  async create(@Body() body) {
    const userRepo = this.dataSource.getRepository(User);
    const user = new User();
    const { fullName, age } = body;
    user.fullName = fullName;
    user.age = age;

    if (!fullName || !age) {
      return { message: 'please provide all required fields' };
    }

    await userRepo.save(user);
    return { message: 'user created successfully', user: user };
  }

  // get all users
  @Get()
  async findAll() {
    const userRepo = this.dataSource.getRepository(User);
    const users = await userRepo.find();
    return users;
  }

  // get specific user
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    if (!user) {
      return { message: 'user not found' };
    }
    return user;
  }

  // update user
  @Patch(':id')
  async update(@Param('id') id: number, @Body() body) {
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    if (!user) {
      return { message: 'user not found' };
    }
    const { fullName, age } = body;
    user.fullName = fullName;
    user.age = age;
    await userRepo.save(user);
    return { message: 'user updated successfully', user: user };
  }

  // delete user
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    if (!user) {
      return { message: 'user not found' };
    }
    await userRepo.remove(user);
    return { message: 'user deleted successfully' };
  }
}
