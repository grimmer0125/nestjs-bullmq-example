import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { QUEUE_NAME as BULLMQ_QUEUE_NAME } from './bullMQ/bullMQ.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');
  const queues = createBullBoard({
    queues: [new BullMQAdapter(app.get(`BullQueue_${BULLMQ_QUEUE_NAME}`))],
    serverAdapter: serverAdapter,
  });
  const { addQueue, removeQueue, setQueues, replaceQueues } = queues;
  app.use('/admin/queues', serverAdapter.getRouter());
  await app.listen(3001);
}
bootstrap();
