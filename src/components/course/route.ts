import { Router } from 'express'
import { CourseController as Controller} from './controller'
import { validate } from 'express-validation'
import { CourseValidator, CommonValidator } from '../../utils/validator'

const CourseRouter : Router = Router()

CourseRouter.get('/course/:id', validate(CommonValidator.id), Controller.find)
            .get('/search/course/:name', Controller.find)
            .get('/courses', validate(CommonValidator.pagination), Controller.findAll)
            .post('/course', validate(CourseValidator.postModel), Controller.add)
            .put('/course', validate(CourseValidator.model), Controller.update)
            .delete('/course/:id', validate(CommonValidator.id), Controller.delete)

module.exports = CourseRouter