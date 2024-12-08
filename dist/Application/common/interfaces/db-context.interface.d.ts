import { Model } from 'dynamoose/dist/Model';
import { Task } from 'src/Domain/entities/task.entity';
import { User } from 'src/Domain/entities/user.entity';
export interface IDbContext {
    user: Model<User>;
    task: Model<Task>;
}
