import { createLogger, format, Logger, transports } from 'winston'
import 'winston-daily-rotate-file'


const consoleFormat = format.combine(
    format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss A'
    }),
    format.padLevels(),
    format.colorize(),
    format.splat(),
    format.printf((info) => {
        return `[${info.level}] ${info.timestamp} ${info.message}`
    })
)

const fileErrorFormat = format.combine(
    format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss A'
    }),
    format.padLevels(),
    format.uncolorize(),
    format.splat(),
    format.simple(),
)

const fileCombinedFormat = format.combine(
    format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss A'
    }),
    format.padLevels(),
    format.uncolorize(),
    format.splat(),
    format.printf((info) => {
        return `[${info.level}] ${info.timestamp} ${info.message}`
    })
)

const logger: Logger = createLogger({
    transports: [
        new transports.Console({
            level: 'http',
            format: consoleFormat,
        }),
        new transports.DailyRotateFile({
            level: 'error',
            format: fileErrorFormat,
            maxFiles: '31d',
            filename: 'log-error-%DATE%.log',
            dirname: 'logs',
        }),
        new transports.DailyRotateFile({
            level: 'http',
            format: fileCombinedFormat,
            maxFiles: '31d',
            filename: 'log-combined-%DATE%.log',
            dirname: 'logs',
        }),
    ]
})

export { logger }