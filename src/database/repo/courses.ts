import { IDatabase, IMain, QueryFile } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { courses as Course } from '../models'
import { pagination_args } from "../modelsCustom";
import { course as sql, common} from '../sql'

export class CoursesRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<Course | null> {
      return await this.db.oneOrNone(common.findByID, {tableName: 'courses', id})
    }

    async findByName(name: string, args: pagination_args): Promise<Course[] | null> {
      const pgArgs = parsePagination(args)
      const {limit, offset} = pgArgs
      return await this.db.manyOrNone(sql.findByName, {name, limit, offset})
    }
    
    async add(data: Course) {
      return await this.db.one(sql.add, data)
    }

    async update(data: Course) {
      return await this.db.result(sql.update, data)
    }

    async delete(id: String) {
      return await this.db.result(sql.delete, {id})
    }


    // TODO: move this to outside, maybe in utils?
    async checkIfIDExistsThenQuery(data: any, table: string, thenQueryFile: QueryFile) {
      return await this.db.task(async t => {
        data._table = table
        const row = await t.one(common.exists, data)
          if (row.exists) {
            await t.none(thenQueryFile, data)
          }
          return row.exists
      })
    }
    
    
    async exists(id: string) {
      return await this.db.one(common.exists, {tableName: 'courses', id: id})
    }
}