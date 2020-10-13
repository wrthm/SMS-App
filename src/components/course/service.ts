import db from '../../database/index'
import { course } from '../../database/models'

const CourseService = {
    findAll: async () => {
        let result: course[] = await db.courses.findAll()
        return JSON.stringify(result)
    },

    create: async () => {
        throw("Not implemented")
    }
}

export default CourseService