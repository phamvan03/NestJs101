import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'src/Domain/entities/task.entity';
import { IDbContext } from 'src/Application/common/interfaces/db-context.interface';
import { IException } from 'src/Application/common/interfaces/exceptions.interface';

@Injectable()
export class TaskService {
  constructor(
    @Inject('IDbContext') private readonly dbContext: IDbContext,
    @Inject('IException') private readonly exception: IException,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task>{
    try {
      const newTask = {
        user_id: createTaskDto.user_id,
        task_id: createTaskDto.task_id,
        task_name: createTaskDto.task_name,
        task_description: createTaskDto.task_description,
        status: createTaskDto.status,
        created_at: new Date().getTime(),
      } as Task;
      await this.dbContext.task.create(newTask);
      return newTask;
    } catch (error) {
      console.error('Eror Create user:', error);
      throw error;
    }
  }

  findAll() {
    return this.dbContext.task.scan().exec();
  }

  findByUserId(user_id: string) {
    const user = this.dbContext.task.query("user_id").eq(user_id).exec();
    if (!user) {
      this.exception.notFoundException({
        message: `Tasks with UserID ${user_id} not found`,
        errorCode: 404,
      });
    }
    return user;
  }
 async findByStatus(user_id: string, status: number){
  const id = String(user_id);
  const s = Number(status);
  const existingTask = await this.dbContext.task.query('user_id')
      .eq(id)
      .where('status')
      .eq(s)
      .using('status_index')
      .exec();
      console.log(existingTask, s, id);
      if (!existingTask || existingTask.length === 0) {
        this.exception.notFoundException({
          message: `Task not found`,
          errorCode: 404,
        });
      }
    return existingTask;
 }
  async update(user_id: string, task_id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const existingTask = await this.dbContext.task.query('user_id')
      .eq(user_id)
      .and()
      .where('task_id')
      .eq(task_id)
      .exec();
      if (!existingTask || existingTask.length === 0) {
        this.exception.notFoundException({
          message: `Task with ID ${task_id} for user with ID ${user_id} not found`,
          errorCode: 404,
        });
      }
      const updatedUser = await this.dbContext.task.update(
        { user_id, task_id },
        { ...updateTaskDto, updated_at: Date.now() }
      );
      return updatedUser;
    } catch (error) {
      console.error(`Error updating ID ${user_id}:`, error);
      throw error;
    }
  }
 async underlineTask(user_id: string, task_id: string){
  try {
    const existingTask = await this.dbContext.task.query('user_id')
    .eq(user_id)
    .and()
    .where('task_id')
    .eq(task_id)
    .exec();
    if (!existingTask || existingTask.length === 0) {
      this.exception.notFoundException({
        message: `Task with ID ${task_id} for user with ID ${user_id} not found`,
        errorCode: 404,
      });
    }
    existingTask[0].status = 2;
    const updatedUser = await this.dbContext.task.update(
      { user_id, task_id },
      { status: 2 },
    );
    return updatedUser;
  } catch (error) {
    console.error(`Error updating ID ${user_id}:`, error);
    throw error;
  }
 }
  async remove(user_id: string, task_id: string) {
    try {
      const existingTask = await this.dbContext.task.query('user_id')
      .eq(user_id)
      .and()
      .where('task_id')
      .eq(task_id)
      .exec();
      if (!existingTask || existingTask.length === 0) {
        this.exception.notFoundException({
          message: `Task with ID ${task_id} for user with ID ${user_id} not found`,
          errorCode: 404,
        });
      }
      await this.dbContext.task.delete({ user_id, task_id });
      return { message: `Task with ID ${task_id} has been deleted` };
    } catch (error) {
      console.error(`Error deleting ID ${task_id}:`, error);
      throw error;
    }
  }
  }
