import { Application, json, Response, Request, NextFunction } from 'express';
import { NotFoundException } from '../exceptions';
import { errorHandler } from '../middleware/errorHandler'
import { mw as requestIPmw } from 'request-ip'
import requestLogger from '../middleware/requestLogger'
import cors from '../middleware/cors'

export default function(app: Application) {
    app.use(
        requestIPmw(),
        json(),
        requestLogger(),
    )

    // CORS-enabled routes go here
    app.options('*', cors())
    app.use(
        cors(),
        require('./course/route'),
        require('./department/route'),
        require('./academic_term/route'),
        require('./student/route'),
        require('./subject/route'),
        require('./enrollment/route'),
        require('./grade/route'),
        require('./professor/route'),
        require('./guardian/route'),
        require('./attendance/route'),
        require('./schedule/route'),
        require('./course_schedule/route'),
        require('./course_schedule_content/route'),
        require('./rfid/route'),
    )

    // 404 error
    app.all('*', (req:Request, res:Response, next: NextFunction) => {
        next(new NotFoundException('API endpoint does not exist'))
    })


    app.use(errorHandler)
}