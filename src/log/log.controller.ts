import { CacheInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { LogService } from './log.service';

@Controller('log')
/*@UseInterceptors(CacheInterceptor)*/
export class LogController {

  constructor(private logService: LogService) {
  }

  @Get('analyse')
  processFileLog() {
    return this.logService.processFileLog();
  }
}
