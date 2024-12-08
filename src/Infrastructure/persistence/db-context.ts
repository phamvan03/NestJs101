import * as dynamoose from 'dynamoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'dynamoose/dist/Model';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/Domain/entities/user.entity';
import { IDbContext } from 'src/Application/common/interfaces/db-context.interface';
import { Task } from 'src/Domain/entities/task.entity';
import { UserSchema } from 'src/Domain/entities/user.schema';
import { TaskSchema } from 'src/Domain/entities/task.schema';
@Injectable()
export class DbContext implements IDbContext {
  user: Model<User>;
  task: Model<Task>;

  constructor(private config: ConfigService) {
    const tablePrefix = this.config.get<string>('tablePrefix');
    this.user = dynamoose.model<User>(
      `${tablePrefix}-users`,
      UserSchema,
    );
    this.task = dynamoose.model<Task>(
      `${tablePrefix}-tasks`,
      TaskSchema,
    );
  }
}
