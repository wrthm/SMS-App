import { IDatabase, IMain, QueryFile } from 'pg-promise'
import { parsePagination } from '../../utils/parsePagination'
import { schedules as Schedule } from '../models'
import { pagination_args, search_schedule_args } from '../modelsCustom'
import { schedules as sql, common} from '../sql'

export class SchedulesRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<Schedule | null> {
      return await this.db.oneOrNone(common.findByID, {tableName: 'schedules', id})
    }

    async search(searchArgs: search_schedule_args, paginationArgs: pagination_args): Promise<Schedule[]> {
      const pgArgs = parsePagination(paginationArgs)
      return await this.db.manyOrNone(sql.search, {searchArgs, pgArgs})
    }

    async add(data: Schedule) {
      return await this.db.one(sql.add, data)
    }

    async update(data: Schedule) {
      return await this.db.result(sql.update, data)
    }

    async delete(id: String) {
      return await this.db.result(sql.delete, {id})
    }
}