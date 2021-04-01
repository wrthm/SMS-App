import { Router } from 'express'
import { validate } from 'express-validation'
import { CourseValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { CourseController as Controller} from './controller'

const CourseRouter : Router = Router()

CourseRouter.get('/course/:id', validate(CommonValidator.id), Controller.find)
            .get('/search/courses/:name', validate(CommonValidator.pagination), Controller.find)
            .get('/courses', validate(CommonValidator.pagination), Controller.findAll)
            .post('/course', validate(SchemaValidator.postModel), Controller.add)
            .put('/course', validate(SchemaValidator.model), Controller.update)
            .delete('/course/:id', validate(CommonValidator.id), Controller.delete)

module.exports = CourseRouter