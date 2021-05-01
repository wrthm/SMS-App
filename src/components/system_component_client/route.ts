import { Router } from 'express'
import { validate } from 'express-validation'
import { AuthComponentClientValidator as SchemaValidator } from '../../utils/validator'
import { ComponentClientController as Controller} from './controller'

const ComponentClientRouter : Router = Router()

ComponentClientRouter.get('/components', Controller.findAll)
                     .post('/component', validate(SchemaValidator.postModel), Controller.add)
                     .delete('/component/:name', Controller.revoke)

module.exports = ComponentClientRouter