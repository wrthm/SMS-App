import { Router } from 'express'
import { validate } from 'express-validation'
import { AuthLoginValidator as LoginValidator } from '../../utils/validator'
import { AuthController as Controller } from './controller'
import { authenticate, authenticateComponentOnly } from '../../middleware/authenticate'

const AuthRouter : Router = Router()

AuthRouter.post('/auth/login', authenticateComponentOnly, validate(LoginValidator.loginModel), Controller.loginDispatcher)
          .get('/auth/logout', authenticate, Controller.logout)
          .get('/auth/whoami', authenticate, Controller.whoAmI)
          .put('/auth/update', authenticate, validate(LoginValidator.putStudentCredModel), Controller.update_password)
          .put('/student/update_credentials', validate(LoginValidator.putStudentCredModel), Controller.update_student_cred)

module.exports = AuthRouter