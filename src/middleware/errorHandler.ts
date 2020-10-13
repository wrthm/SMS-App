import { Request, Response, NextFunction } from 'express';
import { APIException } from '../exceptions/APIException'

export default function (err: APIException, req:Request, res:Response, next:NextFunction) {
    const status = err.status || 500
    const message = err.message || 'An error has occured in the server'
    res.status(status).send({
        status,
        message,
    })
}