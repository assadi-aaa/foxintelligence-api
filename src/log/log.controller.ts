import { CacheInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { LogService } from './log.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('log')
/*@UseInterceptors(CacheInterceptor)*/
export class LogController {

  constructor(private logService: LogService) {
  }

  @ApiResponse({ status: 200, description: 'Return analysed data from log file !' })
  @Get('analyse')
  processFileLog() {
    return this.logService.processFileLog();
  }
}
