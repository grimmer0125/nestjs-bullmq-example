import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/start-bull')
  async startBull(): Promise<string> {
    console.log('/start-bull');
    return this.appService.addStartToBull();
  }

  @Get('/start-bullmq')
  async startBullMQ(): Promise<string> {
    console.log('/start-bullmq');
    return this.catsService.addStartToBullMQ();
  }

  @Get('/stop-bull')
  async stopBull(): Promise<string> {
    console.log('/stop-bull');
    return this.appService.addStopToBull();
  }

  @Get('/stop-bullmq')
  async stopBullMQ(): Promise<string> {
    console.log('/stop-bullmq');
    // return this.appService.addStopToBullMQ();
    return ' ';
  }
}
