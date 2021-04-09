import { IDatabase, IMain, QueryFile } from "pg-promise";
import { course_schedules_contents as CourseScheduleContents } from '../models'
import { course_schedule_contents as sql, common} from '../sql'

export class CourseSchedulesContentsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<CourseScheduleContents | null> {
      return await this.db.oneOrNone(sql.findByID, {id})
    }

    async listByCourseSchedule(cs_id: string): Promise<CourseScheduleContents[] | null> {
      return await this.db.manyOrNone(sql.listCourseSchedule, {cs_id})
    }
    
    async add(data: CourseScheduleContents) {
      return await this.db.one(sql.add, data)
    }

    async delete(id: String) {
      return await this.db.result(sql.delete, {id})
    }
}