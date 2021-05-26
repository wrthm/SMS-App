import DatabaseService from '../../database'
import { checkIfNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { attendances_plan_b as attendance } from '../../database/models'
import { attendance_b_qr } from '../../database/modelsCustom'
import { InvalidArgumentException, NotFoundException, UnauthorizedException } from '../../exceptions'
import { systemComponentBits } from '../../utils/authConstants'

const Controller = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: attendance | null
        let { id } = req.params
        try {
            if (id) {
                result = await DatabaseService.attendances_plan_b.findByID(id)
            } else {
                return next(new InvalidArgumentException())
            }
            checkIfNull(result)
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await DatabaseService.common.listAll(req.query, 'attendances_plan_b')
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            if ((await DatabaseService.attendances_plan_b.delete(id)).rowCount !== 0) {
                return res.send({"code": 200,"message": "Entry deleted successfully"})
            }
            else {
                return next(new NotFoundException('Entry does not exist'))
            }
        } catch (err) {
            next(err)
        }
    },
    scan: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!((req.component as number) & systemComponentBits.AttendanceTracker)) {
                return next(new UnauthorizedException('Invalid Component Key'))
            }
            let data: attendance_b_qr = req.body
            if ((await DatabaseService.common.exists(data.i, 'students')).exists) {
                return res.send({message: "it werks nice"})
            } else {
                return next(new NotFoundException('Student ID does not match any entries in the database'))
            }
        }
        catch (err) {
            next(err)
        }
    },
}



export { Controller as AttendanceBController }