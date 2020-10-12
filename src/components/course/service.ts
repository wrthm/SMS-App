import { QueryResult } from 'pg'
import db from '../../database/index'

const CourseService = {
    get: async () => {
        let result: QueryResult = await db.query("SELECT NOW() as now", [])
        console.log(JSON.stringify(result.rows))
        return JSON.stringify(result.rows)
    },

    create: async () => {
        let result: QueryResult = await db.query("SELECT NOW() as now", [])
        console.log(JSON.stringify(result.rows))
        return result.rows
    }
}

export default CourseService