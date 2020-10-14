import { createLogger, format, Logger, transports } from 'winston'

// TODO: add a separate file logger transport for errors
const logger: Logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.splat(),
        format.simple()
    ),
    transports: [new transports.Console()]
})

export { logger }