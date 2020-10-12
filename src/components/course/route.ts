import { Router } from 'express'
import { CourseController } from './controller'

const CourseRouter : Router = Router()

CourseRouter.get('/course', CourseController.get)
            .post('/course', CourseController.post)

module.exports = CourseRouter