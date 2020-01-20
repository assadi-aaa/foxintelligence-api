import { Test, TestingModule } from '@nestjs/testing';
import { LogService } from './log.service';
import { ConfigModule } from '../config/config.module';
import { FileReaderService } from '../services';
import { StorageModule } from '../storage/storage.module';

describe('LogService', () => {
  let service: LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, StorageModule],
      providers: [LogService, FileReaderService],
    }).compile();

    service = module.get<LogService>(LogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
