import 'reflect-metadata';
import express from 'express';
import { container } from 'tsyringe';
import { Logger } from 'pino-multi-stream';
import { setupErrorHandling } from './util/setupErrorHandling';
import { setupLogger } from './util/setupLogger';
import { TechnobabbleGenerator } from './generator';
import { BaseGenerator } from './generator/BaseGenerator';

export function bootstrap(): void {
  setupLogger();
  setupErrorHandling();

  const PORT = 8000;
  const logger = container.resolve<Logger>('logger');

  const server = express();

  server.get('/technobabble', (req, res) => container.resolve<BaseGenerator>(TechnobabbleGenerator).process(req, res));

  server.listen(PORT, () => {
    logger.info(`Random generator started in ${process.env['NODE_ENV'] ?? 'unknown'} environment at port ${PORT}`);
  });
}
