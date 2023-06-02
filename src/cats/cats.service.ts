import { Injectable } from '@nestjs/common';

import { InjectQueue as InjectBullMQQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { QUEUE_NAME as BULLMQ_QUEUE_NAME } from '../bullMQ/bullMQ.constants';
import { BullMQEventsListener } from '../bullMQ/bullMQ.eventsListener';

@Injectable()
export class CatsService {
  constructor(
    @InjectBullMQQueue(BULLMQ_QUEUE_NAME) readonly bullMQQueue: Queue,
    private readonly bullMQEventsListener: BullMQEventsListener,
  ) {}

  async addStartToBullMQ() {
    const job = await this.bullMQQueue.add('start', {});

    /** alternative 1 */
    // const queueEvents = new QueueEvents(BULLMQ_QUEUE_NAME, {
    //   connection: {
    //     host: '0.0.0.0',
    //     port: 6380,
    //   },
    // });

    /** reuse queueEvents. Each queueEvents need one Redis connection
     * ref: https://docs.bullmq.io/guide/connections
     */
    const events = this.bullMQEventsListener.queueEvents;
    const jobReturn = await job.waitUntilFinished(events);
    return jobReturn;
  }
}
