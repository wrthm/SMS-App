import DatabaseService from '../../database'
import { checkIfNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { subjects as subject} from '../../database/models'
import { InvalidArgumentException, NotFoundException } from '../../exceptions'

const Controller = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: subject | subject[] | null
        let { id, name } = req.params
        try {
            if (id) {
                result = await DatabaseService.subjects.findByID(id)
            } else if (name) {
                result = await DatabaseService.subjects.findByName(`%${name}%`, req.query)
            } else {
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
            let { code } = req.query
            let result: subject[]
            if (code) {
                result = await DatabaseService.subjects.listByCode(code as string, req.query)
            } else {
                result = await DatabaseService.common.listAll(req.query, 'subjects')
            }
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        const data: subject = req.body
        data.code = data.code.trim()
        data.name = data.name.trim()
        try {
            let result = await DatabaseService.subjects.add(data)
            res.statusCode = 201
            return res.send({"code": 201, "message": "Entry added successfully", "id": result.id})
        }
        catch (err) {
            next(err)
        }
        
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const data: subject = req.body
        data.code = data.code.trim()
        data.name = data.name.trim()
        try {
            if ((await DatabaseService.subjects.update(data)).rowCount !== 0) {
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
            if ((await DatabaseService.subjects.delete(id)).rowCount !== 0) {
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



export { Controller as SubjectController }