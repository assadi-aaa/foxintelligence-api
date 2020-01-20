import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from './log/log.module';
import { ConfigModule } from './config/config.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [LogModule, ConfigModule, StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
