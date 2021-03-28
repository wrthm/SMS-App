import DatabaseService from '../../database'
import { checkIfNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { courses as course } from '../../database/models'
import { InvalidArgumentException, NotFoundException } from '../../exceptions'

const Controller = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: course | course[] | null
        let { id, name } = req.params
        try {
            if (id) {
                result = await DatabaseService.courses.findByID(id)
            } else if (name) {
                result = await DatabaseService.courses.findByName(`%${name}%`)
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
            const result = await DatabaseService.common.listAll(req.query, 'courses')
            return res.send(JSON.stringify(result))
        }
        catch (err) {
            next(err)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        const course = req.body
        try {
            let result = await DatabaseService.courses.add(course)
            res.statusCode = 201
            return res.send({"status": 201, "message": "Entry added successfuly", "id": result.id})
        }
        catch (err) {
            next(err)
        }
        
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const data: course = req.body
        try {
            if ((await DatabaseService.courses.update(data)).rowCount !== 0) {
                return res.send({"status": 200,"message": "Course updated successfully"})
            }
            else {
                return next(new NotFoundException('Course does not exist'))
            }
            
        } catch (err) {
            next(err)
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            if ((await DatabaseService.courses.delete(id)).rowCount !== 0) {
                return res.send({"status": 200,"message": "Course deleted successfully"})
            }
            else {
                return next(new NotFoundException('Course does not exist'))
            }
        } catch (err) {
            next(err)
        }
    }
}



export { Controller as CourseController }