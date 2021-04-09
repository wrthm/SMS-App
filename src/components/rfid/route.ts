import { Router } from 'express'
import { RFIDController as Controller} from './controller'
import { validate } from 'express-validation'
import { RFIDValidator } from '../../utils/validator'

const RFIDRouter : Router = Router()

RFIDRouter.post('/rfid', validate(RFIDValidator.postModel), Controller.add)

module.exports = RFIDRouter