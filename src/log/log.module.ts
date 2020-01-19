import { CacheModule, Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { FileReaderService, LocalStorageService } from '../services';
import { ConfigModule } from '../config/config.module';
import { ScheduleModule } from 'nest-schedule';

@Module({
  imports: [ScheduleModule.register(), ConfigModule, CacheModule.register(
    {
      ttl: 10, // seconds
    },
  )],
  controllers: [LogController],
  providers: [LogService, LocalStorageService, FileReaderService],
})
export class LogModule {
}
