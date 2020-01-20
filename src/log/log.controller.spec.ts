import { Test, TestingModule } from '@nestjs/testing';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { FileReaderService } from '../services';
import { ConfigModule } from '../config/config.module';
import { LogModule } from './log.module';
import * as responseApi from '../../fixtures/response-analyse-api.json';
import { StorageModule } from '../storage/storage.module';

describe('Log Controller', () => {
  let controller: LogController;
  let logService: LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, LogModule, StorageModule],
      providers: [LogService, FileReaderService],
    }).compile();

    controller = module.get<LogController>(LogController);
    logService = module.get<LogService>(LogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDataFromLog()', () => {
    let spy;

    it('should return an object responseApi', async () => {
      spy = jest.spyOn(logService, 'getDataFromLog');
      spy.mockImplementation(() => Promise.resolve(responseApi));
      const res = await controller.getDataFromLog();
      expect(res).toBe(responseApi);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
    });

  });
});

// tslint:disable-next-line:no-empty
process.on('unhandledRejection', err => {
});
