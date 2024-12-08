import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IDbContext } from 'src/Application/common/interfaces/db-context.interface';
import { IException } from 'src/Application/common/interfaces/exceptions.interface';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/Domain/entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @Inject('IDbContext') private readonly dbContext: IDbContext,
    @Inject('IException') private readonly exception: IException,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existUser = await this.dbContext.user
        .query('username')
        .eq(createUserDto.username)
        .using('UsernameIndex')
        .exec();
      if (existUser.count > 0) {
        this.exception.badRequestException({
          message: 'User already exists',
          errorCode: 409,
        });
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
      const newUser = {
        user_id: createUserDto.user_id,
        username: createUserDto.username,
        password: hashedPassword,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
      } as User;
      await this.dbContext.user.create(newUser);
      return newUser;
    } catch (error) {
      console.error('Eror Create user:', error);
      throw error;
    }
  }
  async findAll(): Promise<any[]> {
    try {
      const users = await this.dbContext.user.scan().exec();
      if (!users || users.count === 0) {
        this.exception.notFoundException({
          message: 'No users found',
          errorCode: 404,
        });
      }
      return users;
    } catch (error) {
      console.error('Error users:', error);
      throw error;
    }
  }
  async findOne(id: string): Promise<any> {
    try {
      const user = await this.dbContext.user.get(id);
      if (!user) {
        this.exception.notFoundException({
          message: `User with ID ${id} not found`,
          errorCode: 404,
        });
      }
      return user;
    } catch (error) {
      console.error(`Error ${id}:`, error);
      throw error;
    }
  }
  async update(user_id: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const existingUser = await this.dbContext.user.query('user_id')
      .eq(user_id)
      .exec();
      if (!existingUser) {
        this.exception.notFoundException({
          message: `User with ID ${user_id} not found`,
          errorCode: 404,
        });
      }
      const updatedUser = await this.dbContext.user.update(
        { user_id },
        { ...updateUserDto },
      );
      return updatedUser;
    } catch (error) {
      console.error(`Error updating ID ${user_id}:`, error);
      throw error;
    }
  }
  async remove(user_id: string): Promise<{ message: string }> {
    try {
      const existingUser = await this.dbContext.user.get({ user_id: user_id });
      if (!existingUser) {
        this.exception.notFoundException({
          message: `User with ID ${user_id} not found`,
          errorCode: 404,
        });
      }
      await this.dbContext.user.delete(user_id);
      return { message: `User with ID ${user_id} has been deleted` };
    } catch (error) {
      console.error(`Error deleting ID ${user_id}:`, error);
      throw error;
    }
  }
}
