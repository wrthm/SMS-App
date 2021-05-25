import { IDatabase, IMain, QueryFile } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { courses as Course } from '../models'
import { pagination_args, courses_put as CoursePut } from "../modelsCustom";
import { courses as sql } from '../sql'

export class CoursesRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<Course | null> {
      return await this.db.oneOrNone(sql.findByID, {id})
    }

    async findByName(name: string, args: pagination_args): Promise<Course[] | null> {
      const pgArgs = parsePagination(args)
      const {limit, offset} = pgArgs
      return await this.db.manyOrNone(sql.findByName, {name, limit, offset})
    }
    
    async listAll(args: pagination_args): Promise<Course[]> {
      const pgArgs = parsePagination(args)
      const { limit, offset } = pgArgs
      return await this.db.manyOrNone(sql.listAll, {limit, offset})
    }

    async add(data: Course) {
      return await this.db.one(sql.add, data)
    }

    async update(data: CoursePut) {
      return await this.db.result(sql.update, data)
    }

    async delete(id: String) {
      return await this.db.result(sql.delete, {id})
    }
}