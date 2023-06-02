import { Injectable } from '@nestjs/common';
import { InjectQueue as InjectBullQueue } from '@nestjs/bull';
import { InjectQueue as InjectBullMQQueue } from '@nestjs/bullmq';
import { QUEUE_NAME as BULL_QUEUE_NAME } from './bull/bull.constants';
import { QUEUE_NAME as BULLMQ_QUEUE_NAME } from './bullmq/bullmq.constants';

import { Queue } from 'bull';
import { Queue as QueueMQ } from 'bullmq';

import { BullMQEventsListener } from './bullMQ/bullMQ.eventsListener';
@Injectable()
export class AppService {
  constructor(
    @InjectBullQueue(BULL_QUEUE_NAME) readonly bullQueue: Queue,
    @InjectBullMQQueue(BULLMQ_QUEUE_NAME)
    readonly bullMQQueue: QueueMQ<any, any, string>,
    private readonly bullMQEventsListener: BullMQEventsListener,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  addStartToBull() {
    return this.bullQueue.add('start');
  }

  async addStartToBullMQ() {
    /** return value is BullMQ Job, not string */
    return await this.bullMQQueue.add('start', {});
  }

  addStopToBull() {
    return this.bullQueue.add('stop');
  }

  async addStopToBullMQ() {
    /** return value is BullMQ Job, not string */
    return await this.bullMQQueue.add('stop', {});
  }
}
