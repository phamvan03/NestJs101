import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from '../../../Controller/task.controller';
import { DbContextModule } from 'src/Infrastructure/persistence/db-context.module';
import { ExceptionModule } from 'src/Infrastructure/services/exceptions.module';

@Module({
  imports: [DbContextModule, ExceptionModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
