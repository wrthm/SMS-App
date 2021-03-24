import { NextFunction, Request, Response } from 'express'
import { RFIDService } from './service'
import { attendances as attendance } from '../../database/models'
import { InvalidArgumentException } from '../../exceptions'

const Controller = {
    add: async (req: Request, res: Response, next: NextFunction) => {
        const rfid: attendance = req.body
        try {
            // call service that performs student lookup from the rfid tag first
            let result = await RFIDService.studentLookup(rfid.rfid_tag)

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