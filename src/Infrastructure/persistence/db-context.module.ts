import { Module } from '@nestjs/common';
import { DbContext } from './db-context';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: 'IDbContext',
      useClass: DbContext,
    },
    ConfigService
  ],
  exports: ['IDbContext'],
})
export class DbContextModule {}
