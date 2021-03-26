import { NextFunction, Request, Response } from 'express'
import { attendances as attendance } from '../../database/models'
import { NotImplementedException } from '../../exceptions'

const Controller = {
    add: async (req: Request, res: Response, next: NextFunction) => {
        const rfid: attendance = req.body
        try {
            // call service that performs student lookup from the rfid tag first
            throw new NotImplementedException()

            // then do logic for attendance
            
            // res.statusCode = 201
            // res.send(result)
        }
        catch (err) {
            next(err)
        }
        
    },
}

export { Controller as RFIDController }