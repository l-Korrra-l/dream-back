import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'test operation' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/favicon.ico')
  getHelloF(): string {
    return this.appService.getHello();
  }
}
