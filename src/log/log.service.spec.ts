import { Test, TestingModule } from '@nestjs/testing';
import { LogService } from './log.service';
import { ConfigModule } from '../config/config.module';
import { LogModule } from './log.module';
import { FileReaderService, LocalStorageService } from '../services';

describe('LogService', () => {
  let service: LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [LogService, FileReaderService, LocalStorageService],
    }).compile();

    service = module.get<LogService>(LogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
