import { createLogger, format, Logger, transports } from 'winston'


const consoleFormat = format.printf((info) => {
    return `[${info.level}] ${info.timestamp} ${info.message}`
})

// TODO: add a separate file logger transport for errors
const logger: Logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: new Intl.DateTimeFormat('en', {
                dateStyle: 'short',
                timeStyle: 'medium'
            }).format
        }),
        format.padLevels(),
        format.colorize(),
        format.splat(),
        consoleFormat
    ),
    transports: [new transports.Console()]
})

export { logger }