import { Model } from 'dynamoose/dist/Model';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/Domain/entities/user.entity';
import { IDbContext } from 'src/Application/common/interfaces/db-context.interface';
import { Task } from 'src/Domain/entities/task.entity';
export declare class DbContext implements IDbContext {
    private config;
    user: Model<User>;
    task: Model<Task>;
    constructor(config: ConfigService);
}
