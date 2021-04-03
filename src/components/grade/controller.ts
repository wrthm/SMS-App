import DatabaseService from '../../database'
import { checkIfNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { grades as grade} from '../../database/models'
import { InvalidArgumentException, NotFoundException } from '../../exceptions'

const Controller = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: grade | grade[] | null
        let { enrollment_id, subject_id } = req.params
        try {
            if (enrollment_id) {
                if (subject_id) {
                    result = await DatabaseService.grades.findByIDs({enrollment_id, subject_id})
                } else {
                    result = await DatabaseService.grades.listByEnrollmentID(enrollment_id)
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
            const result = await DatabaseService.grades.listAll(req.query)
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        const data: grade = req.body
        try {
            await DatabaseService.grades.add(data)
            res.statusCode = 201
            return res.send({"code": 201, "message": "Entry added successfully"})
        }
        catch (err) {
            next(err)
        }
        
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const data: grade = req.body
        try {
            if ((await DatabaseService.grades.update(data)).rowCount !== 0) {
                return res.send({"code": 200,"message": "Entry updated successfully"})
            }
            else {
                return next(new NotFoundException('Entry does not exist'))
            }
            
        } catch (err) {
            next(err)
        }
    },
    // delete: async (req: Request, res: Response, next: NextFunction) => {
    //     const { id } = req.params
    //     try {
    //         if ((await DatabaseService.grades.delete(id)).rowCount !== 0) {
    //             return res.send({"code": 200,"message": "Entry deleted successfully"})
    //         }
    //         else {
    //             return next(new NotFoundException('Entry does not exist'))
    //         }
    //     } catch (err) {
    //         next(err)
    //     }
    // }
}



export { Controller as GradeController }