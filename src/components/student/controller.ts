import DatabaseService from '../../database'
import { checkIfNull, propTrimOrNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { students as student} from '../../database/models'
import { search_student_args } from '../../database/modelsCustom'
import { InvalidArgumentException, NotFoundException } from '../../exceptions'

const Controller = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: student | student[] | null
        let { id, name } = req.params
        let { fname, mname, lname } = req.query
        try {
            if (id) {
                result = await DatabaseService.students.findByID(id)
            } else if (name) {
                let searchArgs: search_student_args
                searchArgs = {fname: `%${name}%`, mname: `%${name}%`, lname: `%${name}%`}
                result = await DatabaseService.students.findByNameOR(searchArgs, req.query)
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
                let searchArgs: search_student_args = {
                    fname: fname as string, 
                    mname: mname as string,
                    lname: lname as string,
                }
                result = await DatabaseService.students.findByNameAND(searchArgs, req.query)
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
            const result = await DatabaseService.common.listAll(req.query, 'students')
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        const data: student = req.body
        data.school_id = propTrimOrNull(data.school_id)
        data.first_name = data.first_name.trim()
        data.middle_name = data.middle_name.trim()
        data.last_name = data.last_name.trim()
        data.address = data.address.trim()
        data.sex = data.sex.trim()
        data.email_address = propTrimOrNull(data.email_address)
        data.username = propTrimOrNull(data.username)
        data.password = propTrimOrNull(data.password)
        // TODO: hash the password
        try {
            let result = await DatabaseService.students.add(data)
            res.statusCode = 201
            return res.send({"code": 201, "message": "Entry added successfully", "id": result.id})
        }
        catch (err) {
            next(err)
        }
        
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const data: student = req.body
        data.school_id = propTrimOrNull(data.school_id)
        data.first_name = data.first_name.trim()
        data.middle_name = data.middle_name.trim()
        data.last_name = data.last_name.trim()
        data.address = data.address.trim()
        data.sex = data.sex.trim()
        data.email_address = propTrimOrNull(data.email_address)
        data.username = propTrimOrNull(data.username)
        data.password = propTrimOrNull(data.password)
        // TODO: hash the password
        try {
            if ((await DatabaseService.students.update(data)).rowCount !== 0) {
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
            if ((await DatabaseService.students.delete(id)).rowCount !== 0) {
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



export { Controller as StudentController }