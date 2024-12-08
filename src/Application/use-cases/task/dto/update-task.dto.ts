import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
    @ApiProperty()
    task_description: string;
    @ApiProperty()
    task_name: string;
    @ApiProperty()
    status: number; // 1: active , 2:inactive
}
