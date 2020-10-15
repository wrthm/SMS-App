import { Router } from 'express'
import { CourseController as Controller} from './controller'
import { validate } from 'express-validation'
import { CourseValidator as validator } from '../../utils/validator'

const CourseRouter : Router = Router()

CourseRouter.get('/course/:id', validate(validator.id), Controller.find)
            .get('/search/course/:name', Controller.find)
            .get('/courses', Controller.findAll)
            .post('/course', validate(validator.model), Controller.add)
            .put('/course/:id', validate(validator.id), validate(validator.model), Controller.update)
            .delete('/course/:id', validate(validator.id), Controller.delete)

module.exports = CourseRouter