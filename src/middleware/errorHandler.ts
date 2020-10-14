import { Request, Response, NextFunction } from 'express';
import { APIException } from '../exceptions/APIException'
import { logger } from '../utils/logger'

export const errorHandler = (err: APIException, req:Request, res:Response, next:NextFunction) => {
    const status = err.status || 500
    const message = err.message || 'An error has occured in the server'
    process.env.NODE_ENV === 'development' ? logger.error(err.stack) : logger.error(err)
    res.status(status).send({
        status,
        message,
    })
}