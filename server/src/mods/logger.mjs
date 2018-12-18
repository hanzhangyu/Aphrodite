import process from 'process';
import pino from 'pino';
import CONFIG from '../utils/config';

const output = CONFIG.isDev ? undefined : pino.extreme('.log');
const prettyPrint = CONFIG.isDev ? { colorize: true } : false;

const logger = pino(
    {
        name: CONFIG.name,
        level: CONFIG.logLevel,
        prettyPrint,
    },
    output,
);

// asynchronously flush every 10 seconds to keep the buffer empty
// in periods of low activity
setInterval(function () {
    logger.flush()
}, 10000).unref();

// use pino.final to create a special logger that
// guarantees final tick writes
const handler = pino.final(logger, (err, finalLogger, evt) => {
    finalLogger.info(`${evt} caught`);
    if (err) finalLogger.error(err, 'error caused exit');
    process.exit(err ? 1 : 0)
});
// catch all the ways node might exit
process.on('beforeExit', () => handler(null, 'beforeExit'));
process.on('exit', () => handler(null, 'exit'));
process.on('uncaughtException', (err) => handler(err, 'uncaughtException'));
process.on('SIGINT', () => handler(null, 'SIGINT'));
process.on('SIGQUIT', () => handler(null, 'SIGQUIT'));
process.on('SIGTERM', () => handler(null, 'SIGTERM'));

export default logger;
