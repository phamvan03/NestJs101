import { Module } from '@nestjs/common';
import { ExceptionsService } from './exceptions.service';

@Module({
  providers: [
    {
      provide: 'IException',
      useClass: ExceptionsService,
    },
  ],
  exports: ['IException'],
})
export class ExceptionModule {}
