import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { FileReaderService, LocalStorageService } from '../services';
import { ScheduleModule } from 'nest-schedule';

@Module({
  imports: [ScheduleModule.register()],
  controllers: [LogController],
  providers: [LogService, LocalStorageService, FileReaderService],
})
export class LogModule {
}
