import { Router, Request, Response } from 'express'
import CourseService from './service'

const CourseController : controllerInterface = {
    get: async (req: Request, res: Response) => {
        let result = await CourseService.get()
        res.send(result)
    },
    post: async (req: Request, res: Response) => {
        let result = await CourseService.get()
        return result
    },
    put: async (req: Request, res: Response) => {
        let result = await CourseService.get()
        return result
    },
    delete: async (req: Request, res: Response) => {
        let result = await CourseService.get()
        return result
    }
}

export { CourseController }