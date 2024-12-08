import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from '../Application/use-cases/task/task.service';
import { CreateTaskDto } from '../Application/use-cases/task/dto/create-task.dto';
import { UpdateTaskDto } from '../Application/use-cases/task/dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get('/findByUserId')
  findOne(@Query('user_id') user_id: string) {
    return this.taskService.findByUserId(user_id);
  }
  @Get('/findByStatus')
  findByStatus(
    @Query('user_id') user_id: string,
    @Query('status') status: number) {
    return this.taskService.findByStatus(user_id, status);
  }

  @Patch(':user_id/:task_id')
  async update(
    @Param('user_id') user_id: string,
    @Param('task_id') task_id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(user_id, task_id, updateTaskDto);
  }
  @Patch('/underline')
  async underlineTask(
    @Query('user_id') user_id: string,
    @Query('task_id') task_id: string,
  ) {
    return this.taskService.underlineTask(user_id, task_id);
  }
  @Delete(':user_id/:task_id')
  async remove(
    @Param('user_id') user_id: string,
    @Param('task_id') task_id: string) {
    return this.taskService.remove(user_id, task_id);
  }
}
