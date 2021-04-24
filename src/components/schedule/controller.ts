import DatabaseService from '../../database'
import { checkIfNull } from '../../utils/validationUtils'
import { NextFunction, Request, Response } from 'express'
import { schedules as schedule} from '../../database/models'
import { pagination_args, schedules_external as schedule_external, search_schedule_args } from '../../database/modelsCustom'
import { InvalidArgumentException, NotFoundException } from '../../exceptions'
import { convertDaysToArray } from '../../utils/parseSchedule'

const Controller = {
    find: async (req: Request, res: Response, next: NextFunction) => {
        let result: schedule_external | schedule[] | null
        let { id } = req.params
        try {
            if (id) {
                result = await DatabaseService.schedules.findByID(id)
            } else {
                return next(new InvalidArgumentException())
            }
            checkIfNull(result)
            if (Array.isArray(result)) {
                result.forEach(element => {
                    element.days = convertDaysToArray(element.days)
                })
            } else {
                (result as schedule_external).days = convertDaysToArray((result as schedule_external).days as number)
            }
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    search: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page, limit, ...searchArgs } = req.query
            parseScheduleSearchArgs(searchArgs)
            const result: schedule_external[] = await DatabaseService.schedules.search(searchArgs, {page, limit} as pagination_args)
            result.forEach(element => {
                element.days = convertDaysToArray(element.days as number)
            })
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: schedule_external[] = await DatabaseService.schedules.listAll(req.query)
            result.forEach(element => {
                element.days = convertDaysToArray(element.days as number)
            })
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        const data: schedule_external = req.body
        try {
            processScheduleData(data)
            let result = await DatabaseService.schedules.add(data as schedule)
            res.statusCode = 201
            return res.send({"code": 201, "message": "Entry added successfully", "id": result.id})
        }
        catch (err) {
            next(err)
        }
        
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const data: schedule = req.body
        try {
            processScheduleData(data)
            if ((await DatabaseService.schedules.update(data)).rowCount !== 0) {
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
            if ((await DatabaseService.schedules.delete(id)).rowCount !== 0) {
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

const processScheduleData = (obj: schedule_external) => {
    // trim strings
    obj.room = obj.room.trim()
    obj.class = obj.class.trim()

    // encode days array into bitmasked integer
    if (Array.isArray(obj.days)) {
        let daysInt = 0
        obj.days.forEach(element => {
            switch (element.toLowerCase()) {
                case 'm':
                case 'mon':
                case 'monday':
                    daysInt |= 0b0000_0001
                    break
                case 't':
                case 'tues':
                case 'tuesday':
                    daysInt |= 0b0000_0010
                    break
                case 'w':
                case 'wed':
                case 'wednesday':
                    daysInt |= 0b0000_0100
                    break
                case 'th':
                case 'thur':
                case 'thursday':
                    daysInt |= 0b0000_1000
                    break
                case 'f':
                case 'fri':
                case 'friday':
                    daysInt |= 0b0001_0000
                    break
                case 'sa':
                case 'sat':
                case 'saturday':
                    daysInt |= 0b0010_0000
                    break
                case 'su':
                case 'sun':
                case 'sunday':
                    daysInt |= 0b0100_0000
                    break
                default:
                    throw new InvalidArgumentException(`Invalid day specified ("${element}")`)
            }
            obj.days = daysInt
        })
    } else if (obj.days > 0b0111_1111) {
        throw new InvalidArgumentException('Bitmasked day value out of range')
    }

    // TODO: check if schedule duration is way too short or long
    // or just perform the check in postgres instead...
    // if (obj.time_duration.toLowerCase().includes('day')) {
    //     throw new InvalidArgumentException('Duration ')
    // }
}

const parseScheduleSearchArgs = (args: search_schedule_args) => {
    const search_args_keys = ['s_name', 'p_fname', 'p_mname', 'p_lname', 'room', 'class']

    search_args_keys.forEach((key) => {
        if (args[key]) {
            args[key] = `%${args[key]}%`
        } else {
            args[key] = '%'
        }
    })
}

export { Controller as ScheduleController }