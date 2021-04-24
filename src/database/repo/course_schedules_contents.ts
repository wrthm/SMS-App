import { IDatabase, IMain, QueryFile } from "pg-promise";
import { course_schedules_contents as CourseScheduleContents } from '../models'
import { course_schedules_contents_external as CourseScheduleContentsExternal } from "../modelsCustom";
import { course_schedule_contents as sql, course_schedules as cs_sql} from '../sql'

export class CourseSchedulesContentsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<CourseScheduleContentsExternal | null> {
      return await this.db.oneOrNone(sql.findByID, {id})
    }

    async listByCourseSchedule(cs_id: string): Promise<CourseScheduleContentsExternal[] | null> {
      return await this.db.manyOrNone(sql.listCourseSchedule, {cs_id})
    }

    // async listByCourseScheduleFilterByProf(professor_id: string): Promise<any[] | null> {
    //   // fetch schedule prof data
    //   // get unique course scheds from ^
    //   // fetch each course sched for acad term name/id
    //   // build lookup table w/ key=course sched, value = acad term id
    //   // make another array
    //   return await this.db.manyOrNone(sql.listCourseScheduleByProf, {professor_id})
    // }

    async listByCourseScheduleFilterByProfAndAT(professor_id: string, academic_term_id: string): Promise<CourseScheduleContentsExternal[] | null> {
      return await this.db.task(async t => {
        const cs_result = await this.db.manyOrNone(cs_sql._filterByAcademicTerm, {academic_term_id})
        
        if (cs_result.length !== 0) {
          let course_schedule_ids = ''
          for (let i=0; i<cs_result.length; ++i) {
            if (i !== 0) {
              course_schedule_ids += ' OR '
            }
            course_schedule_ids += `c_s_c.course_schedule_id='${cs_result[i].id}'`
          }
          return await this.db.manyOrNone(sql._listCourseScheduleByProfAndAT, {professor_id, course_schedule_ids})
        }
        return []
      })
    }
    
    async add(data: CourseScheduleContents) {
      return await this.db.one(sql.add, data)
    }

    async delete(id: String) {
      return await this.db.result(sql.delete, {id})
    }
}