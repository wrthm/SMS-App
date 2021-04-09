import DatabaseService from '../../database'
import { checkIfNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { course_schedules as course_schedule} from '../../database/models'
import { pagination_args, search_course_schedule_args } from '../../database/modelsCustom'
import { InvalidArgumentException, NotFoundException } from '../../exceptions'

const Controller = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: course_schedule | course_schedule[] | null
        let { id } = req.params
        try {
            if (id) {
                result = await DatabaseService.course_schedules.findByID(id)
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
    search: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page, limit, ...searchArgs } = req.query
            parseCourseScheduleSearchArgs(searchArgs)
            const result: course_schedule[] = await DatabaseService.course_schedules.search(searchArgs, {page, limit} as pagination_args)
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: course_schedule[] = await DatabaseService.common.listAll(req.query, 'course_schedules')
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        const data: course_schedule = req.body
        data.name = data.name.trim()
        try {
            let result = await DatabaseService.course_schedules.add(data)
            res.statusCode = 201
            return res.send({"code": 201, "message": "Entry added successfully", "id": result.id})
        }
        catch (err) {
            next(err)
        }
        
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const data: course_schedule = req.body
        data.name = data.name.trim()
        try {
            if ((await DatabaseService.course_schedules.update(data)).rowCount !== 0) {
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
            if ((await DatabaseService.course_schedules.delete(id)).rowCount !== 0) {
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

const parseCourseScheduleSearchArgs = (args: search_course_schedule_args) => {
    const search_args_keys = ['name', 'c_name', 'a_name']

    search_args_keys.forEach((key) => {
        if (args[key]) {
            args[key] = `%${args[key]}%`
        } else {
            args[key] = '%'
        }
    })
}

export { Controller as CourseScheduleController }