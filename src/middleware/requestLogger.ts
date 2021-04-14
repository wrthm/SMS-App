import { logger } from 'express-winston'
import { logger as loggerInstance } from '../utils/logger'

export default function () {
    return logger({
        winstonInstance: loggerInstance,
        msg: '\x1b[36m{{req.clientIp}}\x1b[0m {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        level: 'http',
        colorize: true,
        meta: true,
        statusLevels: true,
    })
}