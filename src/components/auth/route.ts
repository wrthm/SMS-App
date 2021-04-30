import { Router } from 'express'
import { validate } from 'express-validation'
import { AuthStudentCredentialValidator as StudCredValidator, AuthFacultyValidator as FacultyValidator, CommonValidator } from '../../utils/validator'
import { AuthController as Controller} from './controller'

const AuthRouter : Router = Router()

AuthRouter.post('/auth/login', validate(CommonValidator.loginModel), Controller.loginDispatcher)
          .get('/auth/logout', Controller.nope)
          .get('/auth/whoami', Controller.nope)
          .post('/auth/register', validate(FacultyValidator.postModel), Controller.registerFaculty)
          .put('/auth/update_r', Controller.nope)
          .put('/auth/update_s', validate(StudCredValidator.putModel), Controller.update_student_cred)

module.exports = AuthRouter