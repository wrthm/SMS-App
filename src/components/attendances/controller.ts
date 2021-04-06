import DatabaseService from '../../database'
import { checkIfNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { attendances as attendance} from '../../database/models'
import { InvalidArgumentException, NotFoundException } from '../../exceptions'

const Controller = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: attendance | attendance[] | null
        let { id, student_id, academic_term_id } = req.params
        let args = req.query
        try {
            if (id) {
                result = await DatabaseService.attendances.findByID(id)
            } else if (student_id) {
                if (academic_term_id) {
                    result = await DatabaseService.attendances.listByStudentAcademicTermID(student_id, academic_term_id, args)
                } else {
                    result = await DatabaseService.attendances.listByStudentID(student_id, args)
                }
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
            const result = await DatabaseService.common.listAll(req.query, 'departments')
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            if ((await DatabaseService.attendances.delete(id)).success) {
                return res.send({"code": 200,"message": "Entry deleted successfully"})
            }
            else {
                return next(new NotFoundException('Entry does not exist'))
            }
        } catch (err) {
            next(err)
        }
    }
}



export { Controller as AttendanceController }