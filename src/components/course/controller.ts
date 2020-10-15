import { NextFunction, Request, Response } from 'express'
import { CourseService } from './service'
import { course } from '../../database/models'
import { InvalidArgumentException } from '../../exceptions'

const CourseController = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: course | course[]
        try {
            if (req.params.id) {
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
            const result = await CourseService.findAll()
            res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        const course = req.body
        try {
            let result = await CourseService.add(course)
            res.send(result)
        }
        catch (err) {
            next(err)
        }
        
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const data: course = req.body
        data.id = req.params.id
        try {
            await CourseService.update(data)
            res.send({"status": 200,"message": "Course updated successfully"})
        } catch (err) {
            next(err)
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        const data: course = req.body
        data.id = req.params.id
        try {
            await CourseService.delete(data)
            res.send({"status": 200,"message": "Course deleted successfully"})
        } catch (err) {
            next(err)
        }
    }
}



export { CourseController }