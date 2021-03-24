import db from '../../database/index'
import { courses as course } from '../../database/models'
import { NotFoundException } from '../../exceptions'
import { checkIfNull } from '../../utils/validationUtils'

const Service = {
    findByID: async (id: string) => {
        let result: course | null = await db.courses.findByID(id)
        checkIfNull(result)
        return result as course
    },
    findByName: async (name: string) => {
        let result: course[] | null= await db.courses.findByName(`%${name}%`)
        checkIfNull(result)
        return result as course[]
    },
    listAll: async () => {
        let result: course[] = await db.courses.findAll()
        return JSON.stringify(result)
    },

    //listAllLimited

    add: async (data: course) => {
        let result: course = await db.courses.add(data)
        return {"id": result.id}
    },

    update: async (data: course) => {
        if (!await db.courses.update(data)) 
            throw new NotFoundException('Course does not exist')
    },
    
    delete: async (data: course) => {
        if (!await db.courses.delete(data)) 
            throw new NotFoundException('Course does not exist')
    }
}

export { Service as CourseService }