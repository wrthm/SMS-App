import { Router, Request, Response } from 'express'
import CourseService from './service'

const CourseController = {
    find: async (req: Request, res: Response) => {
        let result = await CourseService.findAll()
        res.send(result)
    },
    findAll: async (req: Request, res: Response) => {
        let result = await CourseService.findAll()
        res.send(result)
    },
    post: async (req: Request, res: Response) => {
        let result = await CourseService.findAll()
        return result
    },
    put: async (req: Request, res: Response) => {
        let result = await CourseService.findAll()
        return result
    },
    delete: async (req: Request, res: Response) => {
        let result = await CourseService.findAll()
        return result
    }
}

export { CourseController }