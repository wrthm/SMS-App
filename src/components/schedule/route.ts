import { Router } from 'express'
import { validate } from 'express-validation'
import { ScheduleValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { ScheduleController as Controller} from './controller'

const DepartmentRouter : Router = Router()

DepartmentRouter.get('/schedule/:id', validate(CommonValidator.id), Controller.find)
                .get('/search/schedules', validate(SchemaValidator.searchArgsModel), Controller.search)
                .get('/schedules', validate(CommonValidator.pagination), Controller.findAll)
                .post('/schedule', validate(SchemaValidator.postModel), Controller.add)
                .put('/schedule', validate(SchemaValidator.model), Controller.update)
                .delete('/schedule/:id', validate(CommonValidator.id), Controller.delete)

module.exports = DepartmentRouter