import { IDatabase, IMain, QueryFile } from 'pg-promise'
import { parsePagination } from '../../utils/parsePagination'
import { course_schedules as CourseSchedule } from '../models'
import { pagination_args, search_course_schedule_args } from '../modelsCustom'
import { course_schedules as sql } from '../sql'

export class CourseSchedulesRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<CourseSchedule | null> {
      return await this.db.oneOrNone(sql.findByID, {id})
    }

    async listAll(args: pagination_args): Promise<CourseSchedule[]> {
      const pgArgs = parsePagination(args)
      const { limit, offset } = pgArgs
      return await this.db.manyOrNone(sql.listAll, {limit, offset})
    }

    async search(searchArgs: search_course_schedule_args, paginationArgs: pagination_args): Promise<CourseSchedule[]> {
      const pgArgs = parsePagination(paginationArgs)
      return await this.db.manyOrNone(sql.search, {searchArgs, pgArgs})
    }

    async add(data: CourseSchedule) {
      return await this.db.one(sql.add, data)
    }

    async update(data: CourseSchedule) {
      return await this.db.result(sql.update, data)
    }

    async delete(id: String) {
      return await this.db.result(sql.delete, {id})
    }
}