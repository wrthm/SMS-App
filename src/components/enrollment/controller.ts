import DatabaseService from '../../database'
import { checkIfNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { enrollments as enrollment } from '../../database/models'
import { InvalidArgumentException, NotFoundException } from '../../exceptions'

const Controller = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: enrollment | enrollment[] | null
        const { id } = req.params
        try {
            if (id) {
                result = await DatabaseService.enrollments.findByID(id)
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
            const result = await DatabaseService.enrollments.listAll(req.query)
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    listByStudentID: async (req: Request, res: Response, next: NextFunction) => {
        const { student_id } = req.params
        try {
            if  (student_id) {
                const result = await DatabaseService.enrollments.listByStudentID(student_id)
                return res.send(result)
            } else {
                return next(new InvalidArgumentException())
            }
        }
        catch (err) {
            next(err)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        const data: enrollment = req.body
        try {
            let result = await DatabaseService.enrollments.add(data)
            if (result.success) {
                res.statusCode = 201
                return res.send({"code": 201, "message": "Entry added successfully", "id": result.result.id})
            } else {
                next(new InvalidArgumentException(result.message))
            }
            
        }
        catch (err) {
            next(err)
        }
        
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            if ((await DatabaseService.enrollments.delete(id)).success) {
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



export { Controller as EnrollmentController }