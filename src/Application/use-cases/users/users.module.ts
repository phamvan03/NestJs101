import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../../../Controller/users.controller';
import { DbContextModule } from 'src/Infrastructure/persistence/db-context.module';
import { ExceptionModule } from 'src/Infrastructure/services/exceptions.module';

@Module({
  imports: [DbContextModule, ExceptionModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
