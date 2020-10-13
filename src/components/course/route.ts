import { Router } from 'express'
import { CourseController } from './controller'

const CourseRouter : Router = Router()

CourseRouter.get('/course', CourseController.find)
            .get('/courses', CourseController.findAll)
            .post('/course', CourseController.post)

module.exports = CourseRouter