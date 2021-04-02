import DatabaseService from '../../database'
import { checkIfNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { departments as department} from '../../database/models'
import { InvalidArgumentException, NotFoundException } from '../../exceptions'

const Controller = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: department | department[] | null
        let { id, name } = req.params
        try {
            if (id) {
                result = await DatabaseService.departments.findByID(id)
            } else if (name) {
                result = await DatabaseService.departments.findByName(`%${name}%`, req.query)
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
            const result = await DatabaseService.common.listAll(req.query, 'departments')
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        const data: department = req.body
        data.name = data.name.trim()
        try {
            let result = await DatabaseService.departments.add(data)
            res.statusCode = 201
            return res.send({"code": 201, "message": "Entry added successfully", "id": result.id})
        }
        catch (err) {
            next(err)
        }
        
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const data: department = req.body
        try {
            if ((await DatabaseService.departments.update(data)).rowCount !== 0) {
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
            if ((await DatabaseService.departments.delete(id)).rowCount !== 0) {
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



export { Controller as DepartmentController }