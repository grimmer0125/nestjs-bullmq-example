import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME as BULL_QUEUE_NAME } from './bull/bull.constants';
import { GlobalBullMQModule } from './bullMQ/bullMQ.module';
import { BullProcessor } from './bull/bull.processor';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: BULL_QUEUE_NAME,
      url: 'redis://0.0.0.0:6379',
    }),
    GlobalBullMQModule.register(),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, BullProcessor],
})
export class AppModule {}
