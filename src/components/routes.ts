import { Application, json, Response, Request, NextFunction } from 'express';
import { NotFoundException } from '../exceptions';
import { errorHandler } from '../middleware/errorHandler'
import { logger } from 'express-winston'
import { logger as loggerInstance } from '../utils/logger'
import { mw as requestIPmw } from 'request-ip'

export default function(app: Application) {
    app.use(
        requestIPmw(),
        json(),
        logger({
            winstonInstance: loggerInstance,
            msg: '\x1b[36m{{req.clientIp}}\x1b[0m {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
            level: 'http',
            colorize: true,
            meta: true,
            statusLevels: true,
        })
    )

    app.use(
        require('./course/route'),
        require('./department/route'),
        require('./academic_term/route'),
        require('./student/route'),
        require('./subject/route'),
        require('./enrollment/route'),
        require('./grade/route'),
        require('./professor/route'),
        require('./guardian/route'),
        require('./attendances/route'),
        require('./schedules/route'),
        require('./rfid/route'),
    )

    // 404 error
    app.all('*', (req:Request, res:Response, next: NextFunction) => {
        next(new NotFoundException('API endpoint does not exist'))
    })


    app.use(errorHandler)
}