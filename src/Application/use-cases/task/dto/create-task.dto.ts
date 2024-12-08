import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty()
    task_id: string;
    @ApiProperty()
    user_id: string;  
    @ApiProperty()
    task_description: string;
    @ApiProperty()
    task_name: string;
    @ApiProperty()
    status: number; // 1: active , 2:inactive
}
