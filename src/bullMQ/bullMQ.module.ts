import { DynamicModule, Global, Module } from '@nestjs/common';

import { BullModule as BullMQModule } from '@nestjs/bullmq';
import { QUEUE_NAME as BULLMQ_QUEUE_NAME } from './bullMQ.constants';
import { BullMQEventsListener } from './bullMQ.eventsListener';
import { BullMQProcessor } from './bullMQ.processor';

const Queues: DynamicModule[] = [
  BullMQModule.forRoot({
    connection: {
      host: '0.0.0.0',
      port: 6379,
    },
  }),

  BullMQModule.registerQueue({
    name: BULLMQ_QUEUE_NAME,
  }),
];

@Global()
@Module({})
export class GlobalBullMQModule {
  static register(): DynamicModule {
    return {
      imports: [...Queues],
      providers: [BullMQEventsListener, BullMQProcessor],
      exports: [BullMQEventsListener, BullMQProcessor, ...Queues],
      module: GlobalBullMQModule,
    };
  }
}
