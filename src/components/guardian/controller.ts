import DatabaseService from '../../database'
import { checkIfNull, propTrimOrNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { guardians as guardian} from '../../database/models'
import { search_name_args } from '../../database/modelsCustom'
import { InvalidArgumentException, NotFoundException } from '../../exceptions'

const Controller = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: guardian | guardian[] | null
        let { student_id, name } = req.params
        let { fname, mname, lname, ...paginationArgs } = req.query
        try {
            if (student_id) {
                result = await DatabaseService.guardians.findByStudentID(student_id)
            } else if (name) {
                let searchArgs: search_name_args
                searchArgs = {fname: `%${name}%`, mname: `%${name}%`, lname: `%${name}%`}
                result = await DatabaseService.guardians.findByNameOR(searchArgs, paginationArgs)
            } else if (fname || mname || lname) {
                if (fname) {
                    fname = `%${fname}%`
                } else {
                    fname = '%'
                }
                if (mname) {
                    mname = `%${mname}%`
                } else {
                    mname = '%'
                }
                if (lname) {
                    lname = `%${lname}%`
                } else {
                    lname = '%'
                }
                let searchArgs: search_name_args = {
                    fname: fname as string, 
                    mname: mname as string,
                    lname: lname as string,
                }
                result = await DatabaseService.guardians.findByNameAND(searchArgs, paginationArgs)
            }
            else {
                return next(new InvalidArgumentException())
            }
            checkIfNull(result)
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await DatabaseService.common.listAll(req.query, 'guardians')
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const data: guardian = req.body
        data.first_name = propTrimOrNull(data.first_name)
        data.middle_name = propTrimOrNull(data.middle_name)
        data.last_name = propTrimOrNull(data.last_name)
        data.phone_number = propTrimOrNull(data.phone_number)
        try {
            if ((await DatabaseService.guardians.update(data)).rowCount !== 0) {
                return res.send({"code": 200,"message": "Entry updated successfully"})
            }
            else {
                return next(new NotFoundException('Entry does not exist'))
            }
            
        } catch (err) {
            next(err)
        }
    },
}



export { Controller as GuardianController }