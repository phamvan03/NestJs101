import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Application/use-cases/users/users.module';
import { TaskModule } from './Application/use-cases/task/task.module';
import dynamoose from 'dynamoose';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({
    load: [
      () => {
        const fileContent = fs.readFileSync('config.yaml', 'utf8');
        return yaml.load(fileContent) as Record<string, any>;
      },
    ],
    isGlobal: true,
  }),UsersModule, TaskModule], // task controller và user controller đã được gọi trong UsersModule và TaskModule
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {
  constructor(private config: ConfigService) {
    dotenv.config({ path: '.envrc' });
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      region: process.env.AWS_REGION,
      endpoint:
        this.config.get<string>('debug') == 'true'
          ? 'http://localhost:4566'
          : undefined,
    });

    dynamoose.aws.ddb.set(ddb);
  }
}
