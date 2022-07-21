import { Application, json, Response, Request, NextFunction } from 'express';
import { NotFoundException } from '../exceptions';
import { errorHandler } from '../middleware/errorHandler'
import { mw as requestIPmw } from 'request-ip'
import requestLogger from '../middleware/requestLogger'
import cors from '../middleware/cors'
import { requestIPcf } from '../middleware/requestIPcf'
import nocache from 'nocache'
import { authenticate } from '../middleware/authenticate'

export default function(app: Application) {
    app.set('etag', false)
    app.use(
        nocache(),
        requestIPmw(),
        requestIPcf(),
        cors(),
        json(),
        requestLogger(),
    )

    app.options('*', cors())
    app.use(
        require('./auth/route'),
        authenticate,
        require('./course/route'),
        require('./department/route'),
        require('./academic_term/route'),
        require('./student/route'),
        require('./subject/route'),
        require('./enrollment/route'),
        require('./grade/route'),
        require('./professor/route'),
        require('./guardian/route'),
        require('./schedule/route'),
        require('./course_schedule/route'),
        require('./course_schedule_content/route'),
        require('./faculty/route'),
        require('./system_component_client/route'),
    )

    // 404 error
    app.all('*', (req:Request, res:Response, next: NextFunction) => {
        next(new NotFoundException('API endpoint does not exist'))
    })


    app.use(errorHandler)
}