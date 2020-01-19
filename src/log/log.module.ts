import { CacheModule, Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { FileReaderService, LocalStorageService } from '../services';
import { ConfigModule } from '../config/config.module';
import { ScheduleModule } from 'nest-schedule';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [ScheduleModule.register(), ConfigModule, CacheModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      ttl: configService.get('CACHE_TTL'),
    }),
    inject: [ConfigService],
  })],
  controllers: [LogController],
  providers: [LogService, LocalStorageService, FileReaderService],
  exports: [LocalStorageService],
})
export class LogModule {
}
