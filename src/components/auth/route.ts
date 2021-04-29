import { Router } from 'express'
import { validate } from 'express-validation'
import { AuthSubjectCredentialValidator as SchemaValidator, CommonValidator } from '../../utils/validator'
import { AuthController as Controller} from './controller'

const AuthRouter : Router = Router()

AuthRouter.post('/auth/login', validate(SchemaValidator.loginModel), Controller.loginDispatcher)
          .get('/auth/logout', Controller.nope)
          .get('/auth/whoami', Controller.nope)
          .post('/auth/register', Controller.nope)
          .put('/auth/update_r', Controller.nope)
          .put('/auth/update_s', validate(SchemaValidator.putModel), Controller.update_student_cred)

module.exports = AuthRouter