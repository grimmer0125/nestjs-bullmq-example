import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUE_NAME } from './bullMQ.constants';

@Processor(QUEUE_NAME)
export class BullMQProcessor extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    console.debug('bullMQ process is called');
    switch (job.name) {
      case 'start':
        return this.start(job);
      case 'stop':
        return this.stop(job);
      default:
        throw new Error(`Process ${job.name} not implemented`);
    }
  }

  async start(job: Job<any, any, string>): Promise<any> {
    return Promise.resolve(`START ${QUEUE_NAME}-${job.id}`);
  }

  async stop(job: Job<any, any, string>): Promise<any> {
    return Promise.resolve(`STOP ${QUEUE_NAME}-${job.id}`);
  }
}
