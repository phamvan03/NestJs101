import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'src/Domain/entities/task.entity';
import { IDbContext } from 'src/Application/common/interfaces/db-context.interface';
import { IException } from 'src/Application/common/interfaces/exceptions.interface';
export declare class TaskService {
    private readonly dbContext;
    private readonly exception;
    constructor(dbContext: IDbContext, exception: IException);
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    findAll(): Promise<import("dynamoose/dist/ItemRetriever").ScanResponse<Task>>;
    findByUserId(user_id: string): Promise<import("dynamoose/dist/ItemRetriever").QueryResponse<Task>>;
    findByStatus(user_id: string, status: number): Promise<import("dynamoose/dist/ItemRetriever").QueryResponse<Task>>;
    update(user_id: string, task_id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    underlineTask(user_id: string, task_id: string): Promise<Task>;
    remove(user_id: string, task_id: string): Promise<{
        message: string;
    }>;
}
