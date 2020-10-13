import { Application, Response, Request, NextFunction } from 'express';
import { APIException } from '../exceptions/APIException'
import errorHandler from '../middleware/errorHandler'

export default function(app: Application) {
    app.use(
        require('./course/route'),
    )

    // 404 error
    app.all('*', (req:Request, res:Response, next: NextFunction) => {
        throw(new APIException(404, 'URI Not Found'))
    })


    app.use(errorHandler)
}