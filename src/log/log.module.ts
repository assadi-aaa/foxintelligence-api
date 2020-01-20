import { CacheModule, Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { FileReaderService } from '../services';
import { ConfigModule } from '../config/config.module';
import { ScheduleModule } from 'nest-schedule';
import { ConfigService } from '../config/config.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [ScheduleModule.register(), ConfigModule, StorageModule, CacheModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      ttl: configService.get('CACHE_TTL'),
    }),
    inject: [ConfigService],
  })],
  controllers: [LogController],
  providers: [LogService, FileReaderService],
})
export class LogModule {
}
