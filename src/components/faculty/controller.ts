import AuthService from '../../database/indexAuth'
import { checkIfNull, propTrimOrNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { faculties as faculty} from '../../database/modelsAuth'
import { InvalidArgumentException, NotFoundException, NotImplementedException } from '../../exceptions'
import { faculties_put as faculty_put, faculties_external as faculty_external } from '../../database/modelsCustom'
import { hash } from 'bcrypt'
import { AppServerConfig } from '../../config'
import { facultyPrivilegeBits as fPrivilegeBits } from '../../utils/authConstants'

const Controller = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: faculty_external | null
        let { id } = req.params
        try {
            if (id) {
                result = await AuthService.faculties.findByID(id)
            } else {
                return next(new InvalidArgumentException())
            }
            checkIfNull(result);
            (result as faculty_external).privilege = decodePrivilege((result as faculty_external).privilege as number)
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: faculty_external[] = await AuthService.faculties.listAll(req.query)
            result.forEach(val => {
                val.privilege = decodePrivilege(val.privilege as number)
            })
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        const data: faculty_external = req.body
        try {
            trimData(data)
            data.privilege = encodePrivilege(data.privilege as string[])
            data.password = await hash(data.password, AppServerConfig.BcryptSaltRounds)

            let result = await AuthService.faculties.add(data as faculty)
            res.statusCode = 201
            return res.send({"code": 201, "message": "Entry added successfully", "id": result.id})
        }
        catch (err) {
            next(err)
        }
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const data: faculty_put = req.body
        try {
            trimData(data)
            if (data.privilege) {
                data.privilege = encodePrivilege(data.privilege as string[])
            }
            if (data.password) {
                data.password = await hash(data.password, AppServerConfig.BcryptSaltRounds)
            }

            if ((await AuthService.faculties.update(data)).rowCount !== 0) {
                return res.send({"code": 200,"message": "Entry updated successfully"})
            }
            else {
                return next(new NotFoundException('Entry does not exist'))
            }
            
        } catch (err) {
            next(err)
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            if ((await AuthService.faculties.delete(id)).rowCount !== 0) {
                return res.send({"code": 200,"message": "Entry deleted successfully"})
            }
            else {
                return next(new NotFoundException('Entry does not exist'))
            }
        } catch (err) {
            next(err)
        }
    }
}

const trimData = (data: faculty_put | faculty_external) => {
    data.first_name = propTrimOrNull(data.first_name)
    data.middle_name = propTrimOrNull(data.middle_name)
    data.last_name = propTrimOrNull(data.last_name)
    data.address = propTrimOrNull(data.address)
    data.username = propTrimOrNull(data.username)
    data.phone_number = propTrimOrNull(data.phone_number)
}

const encodePrivilege = (arr: string[]) => {
    let privilegeBit = 0
    arr.forEach((val) => {
        switch (val.toLowerCase()) {
            case 'managementpanelregistrar':
                privilegeBit |= fPrivilegeBits.ManagementPanelRegistrar
                break
            case 'managementpaneladmin':
                privilegeBit |= fPrivilegeBits.ManagementPanelAdmin
                break
            case 'attendance':
                privilegeBit |= fPrivilegeBits.Attendance
                break
            case 'studentinformationsystem':
                privilegeBit |= fPrivilegeBits.StudentInformationSystem
                break
            default:
                throw new InvalidArgumentException(`Invalid faculty privilege (${val})`)
        }
    })
    return privilegeBit
}

const decodePrivilege = (bits: number) => {
    let privilegeArr: string[] = []
    for (const privilege in fPrivilegeBits) {
        if ((fPrivilegeBits[privilege] & bits) !== 0) {
            privilegeArr.push(privilege)
        }
    }
    return privilegeArr
}

export { Controller as FacultyController }