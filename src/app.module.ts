import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Application/use-cases/users/users.module';
import { TaskModule } from './Application/use-cases/task/task.module';
import { ConfigModule } from '@nestjs/config';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
@Module({
  imports: [ConfigModule.forRoot({
    load: [
      () => {
        const fileContent = fs.readFileSync('config.yaml', 'utf8');
        return yaml.load(fileContent) as Record<string, any>;
      },
    ],
    isGlobal: true,
  }),UsersModule, TaskModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
