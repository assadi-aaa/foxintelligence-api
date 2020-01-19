import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  @ApiResponse({ status: 304, description: 'Return hello world !' })
  getHello() {
    return this.appService.getHello();
  }
}
