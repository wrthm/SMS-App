import { Application, json, Response, Request, NextFunction } from 'express';
import { NotFoundException } from '../exceptions';
import { errorHandler } from '../middleware/errorHandler'

export default function(app: Application) {
    app.use(
        json(),
        require('express-log-url')
    )

    app.use(
        require('./course/route'),
        require('./department/route'),
        require('./academic_term/route'),
        require('./student/route'),
        require('./rfid/route'),
    )

    // 404 error
    app.all('*', (req:Request, res:Response, next: NextFunction) => {
        throw(new NotFoundException('API endpoint does not exist'))
    })


    app.use(errorHandler)
}