import { Settings } from 'luxon';
import { final } from 'pino';
import { Logger } from 'pino-multi-stream';
import { container } from 'tsyringe';

export function setupErrorHandling() : void {
  Settings.throwOnInvalid = true;

  const logger = container.resolve<Logger>('logger');

  const handleFinalError = (msg: string) => final(logger, (err, finalLogger) => {
    finalLogger.error(err, msg);
    process.exit();
  });

  process
    .on('unhandledRejection', handleFinalError('unhandledRejection'))
    .on('uncaughtException', handleFinalError('uncaughtException'));
  // .on('exit', () => {
  //   database.getConnection()
  //     .then((c) => c.close())
  //     .finally(() => logger.info('Report tool exits'));
  // });
}
