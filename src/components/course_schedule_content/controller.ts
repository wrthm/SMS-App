import DatabaseService from '../../database'
import { checkIfNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { course_schedules_contents as course_schedule_content} from '../../database/models'
import { InvalidArgumentException, NotFoundException } from '../../exceptions'
import { course_schedules_contents_external } from '../../database/modelsCustom'
import { convertDaysToArray } from '../../utils/parseSchedule'

const Controller = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: course_schedules_contents_external | null
        const { id } = req.params
        try {
            if (id) {
                result = await DatabaseService.course_schedules_contents.findByID(id)
            } else {
                return next(new InvalidArgumentException())
            }
            checkIfNull(result);
            (result as course_schedules_contents_external).schedule_days = convertDaysToArray(result?.schedule_days as number)
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    listByCourseSchedule: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { cs_id } = req.params
            const result = await DatabaseService.course_schedules_contents.listByCourseSchedule(cs_id)
            result?.forEach(element => {
                element.schedule_days = convertDaysToArray(element.schedule_days as number)
            })
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    // listByProf: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { professor_id } = req.params
    //         const result = await DatabaseService.course_schedules_contents.listByCourseScheduleFilterByProf(professor_id)
    //     result?.forEach(element => {
    //         element.schedule_days = convertDaysToArray(element.schedule_days as number)
    //     })
    //         return res.send(result)
    //     }
    //     catch (err) {
    //         next(err)
    //     }
    // },
    listByProfAndAT: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { professor_id, academic_term_id } = req.params
            const result = await DatabaseService.course_schedules_contents.listByCourseScheduleFilterByProfAndAT(professor_id, academic_term_id)
            result?.forEach(element => {
                element.schedule_days = convertDaysToArray(element.schedule_days as number)
            })
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        const data: course_schedule_content = req.body
        try {
            let result = await DatabaseService.course_schedules_contents.add(data)
            res.statusCode = 201
            return res.send({"code": 201, "message": "Entry added successfully", "id": result.id})
        }
        catch (err) {
            next(err)
        }
        
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            if ((await DatabaseService.course_schedules_contents.delete(id)).rowCount !== 0) {
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



export { Controller as CourseScheduleContentController }