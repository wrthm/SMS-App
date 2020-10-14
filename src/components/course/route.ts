import { Router } from 'express'
import { CourseController as Controller} from './controller'

const CourseRouter : Router = Router()

CourseRouter.get('/course/:id', Controller.find)
            .get('/search/course/:name', Controller.find)
            .get('/courses', Controller.findAll)
            .post('/course', Controller.add)
            .put('/course', Controller.update)
            .delete('/course', Controller.delete)

module.exports = CourseRouter