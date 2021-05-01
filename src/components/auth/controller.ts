import AuthService from '../../database/indexAuth'
import DatabaseService from '../../database/index'
import { checkIfNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { students_credentials, sessions, faculties as faculty } from '../../database/modelsAuth'
import { students_credentials_put as student_credential_put } from '../../database/modelsCustom'
import { InvalidArgumentException, NotFoundException, NotImplementedException } from '../../exceptions'
import { hash, compare } from 'bcrypt'
import { AppServerConfig } from '../../config'
import { DateTime } from 'luxon'
import uid from 'uid-safe'

const loginStudent = async (req: Request, res: Response, next: NextFunction) => {
    const credential = req.body
    try {
        const student: students_credentials = await AuthService.students_credentials.findByUsername(credential.username)
        if (student) {
            if (await compare(credential.password, student.password)) {
                // TODO: move session creation routine to a separate function
                const user_agent = (req.headers['user-agent']) ? req.headers['user-agent'] : null
                const session: sessions = {
                    session_token: await uid(24),
                    ip_address: req.clientIp,
                    user_agent: user_agent,
                    type: 'student',
                    id: student.student_id,
                    expiration_date: DateTime.now().plus({days: 7}).toISO()
                }
                await AuthService.sessions.create(session)
                const dataOut = {
                    'id': student.student_id,
                    'session-token': session.session_token,
                    'expiration-date': session.expiration_date,
                }
                return res.send(dataOut)
            }
        }
        next(new InvalidArgumentException('Wrong username or password'))
    } catch (err) {
        next(err)
    }
    
}

const Controller = {
    // login dispatcher
    loginDispatcher: async (req: Request, res: Response, next: NextFunction) => {
        return loginStudent(req, res, next)
    },

    // login routine for student

    // login routine for faculty



    nope: async (req: Request, res: Response, next: NextFunction) => {
        next(new NotImplementedException())
    },

    update_student_cred: async (req: Request, res: Response, next: NextFunction) => {
        const student: student_credential_put = req.body
        try {
            // check first if student exists in main db
            const studentExists = await DatabaseService.common.exists(student.student_id, 'students')

            if (!studentExists.exists) {
                return next(new NotFoundException('Student not found'))
            }

            if (!student.username) {
                student.username = null
            }

            // hash the password first if supplied
            if (student.password) {
                student.password = await hash(student.password, AppServerConfig.BcryptSaltRounds)
            } else {
                student.password = null
            }
            const result = await AuthService.students_credentials.updateOrAdd(student)
            if (result.success) {
                res.send({"code": 200, "message": `Operation completed successfully. (${result.message})`})
            } else {
                next(new InvalidArgumentException(result.message))
            }
        }
        catch (err) {
            if (err?.message.includes('unique_student_username')) {
                next(new InvalidArgumentException('Username already exists'))
            } else {
                next(err)
            }
        }
        
    },

    registerFaculty: async (req: Request, res: Response, next: NextFunction) => {
        const data: faculty = req.body
        // trim fields here
        // hash pw here

        try {
            let result = await AuthService.faculties.add(data)
            res.statusCode = 201
            return res.send({"code": 201, "message": "Entry added successfully", "id": result.id})
        }
        catch (err) {
            next(err)
        }
    },
}



export { Controller as AuthController }