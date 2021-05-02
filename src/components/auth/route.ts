import { Router } from 'express'
import { validate } from 'express-validation'
import { AuthLoginValidator as LoginValidator } from '../../utils/validator'
import { AuthController as Controller } from './controller'
import { authenticateComponentOnly } from '../../middleware/authenticate'

const AuthRouter : Router = Router()

AuthRouter.post('/auth/login', authenticateComponentOnly, validate(LoginValidator.loginModel), Controller.loginDispatcher)
          .get('/auth/logout', Controller.nope)
          .get('/auth/whoami', Controller.nope)
          .put('/auth/update', validate(LoginValidator.putModel), Controller.update_student_cred)

module.exports = AuthRouter