import { TaskService } from '../Application/use-cases/task/task.service';
import { CreateTaskDto } from '../Application/use-cases/task/dto/create-task.dto';
import { UpdateTaskDto } from '../Application/use-cases/task/dto/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto): Promise<import("../Domain/entities/task.entity").Task>;
    findAll(): Promise<import("dynamoose/dist/ItemRetriever").ScanResponse<import("../Domain/entities/task.entity").Task>>;
    findOne(user_id: string): Promise<import("dynamoose/dist/ItemRetriever").QueryResponse<import("../Domain/entities/task.entity").Task>>;
    findByStatus(user_id: string, status: number): Promise<import("dynamoose/dist/ItemRetriever").QueryResponse<import("../Domain/entities/task.entity").Task>>;
    update(user_id: string, task_id: string, updateTaskDto: UpdateTaskDto): Promise<import("../Domain/entities/task.entity").Task>;
    underlineTask(user_id: string, task_id: string): Promise<import("../Domain/entities/task.entity").Task>;
    remove(user_id: string, task_id: string): Promise<{
        message: string;
    }>;
}
