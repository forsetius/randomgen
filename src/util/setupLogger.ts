import pino from 'pino';
import pinoMS from 'pino-multi-stream';
import { container, instanceCachingFactory as factory } from 'tsyringe';
import { DateTime } from 'luxon';

export function setupLogger(): void {
  const destinations: pinoMS.Streams = [
    { stream: process.stdout, level: 'debug' },
  ];

  if (process.env['NODE_ENV'] === 'local') {
    destinations.push({ stream: pino.destination('./logs/debug.log'), level: 'debug' });
    destinations.push({ stream: pino.destination('./logs/warn.log'), level: 'warn' });
  }

  container.register(
    'logger',
    {
      useFactory: factory(() => pinoMS({
        streams: destinations,
        timestamp: () => `,"time":"${DateTime.now().toISO()}"`,
      })),
    },
  );
}
