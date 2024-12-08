import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../Application/use-cases/users/users.service';
import { CreateUserDto } from '../Application/use-cases/users/dto/create-user.dto';
import { UpdateUserDto } from '../Application/use-cases/users/dto/update-user.dto';
import { User } from 'src/Domain/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get('/users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('getById:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('/update:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/delete:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
