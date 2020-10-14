import db from '../../database/index'
import { course } from '../../database/models'
import { checkIfNull } from '../../utils/validationUtils'

const CourseService = {
    findByID: async (id: string) => {
        let result: course | null = await db.courses.findByID(id)
        checkIfNull(result)
        return result as course
    },
    findByName: async (name: string) => {
        let result: course[] | null= await db.courses.findByName('%' + name + '%')
        checkIfNull(result)
        return result as course[]
    },
    findAll: async () => {
        let result: course[] = await db.courses.findAll()
        return JSON.stringify(result)
    },

    add: async (data: course) => {
        let result: course = await db.courses.add(data)
        return {"id": result.id}
    }
}

export { CourseService }