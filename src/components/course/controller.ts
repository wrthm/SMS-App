import { NextFunction, Request, Response } from 'express'
import { CourseService } from './service'
import { course } from '../../database/models'
import { InvalidArgumentException } from '../../exceptions'
import { isValidUUID, validateCourse } from '../../utils/validationUtils'

const CourseController = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: course | course[]
        try {
            if (req.params.id) {
                isValidUUID(req.params.id)
                result = await CourseService.findByID(req.params.id)
            } else if (req.params.name) {
                result = await CourseService.findByName(req.params.name)
            } else {
                throw new InvalidArgumentException()
            }
            res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result = await CourseService.findAll()
            res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        let course = req.body
        try {
            if (!validateCourse(course)) throw new InvalidArgumentException()
            let result = await CourseService.add(course)
            res.send(result)
        }
        catch (err) {
            next(err)
        }
        
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        let result = await CourseService.findAll()
        res.send(result)
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        let result = await CourseService.findAll()
        res.send(result)
    }
}

export { CourseController }