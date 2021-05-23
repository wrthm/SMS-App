import { IDatabase, IMain, QueryFile } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { subjects as Subject } from '../models'
import { pagination_args } from "../modelsCustom";
import { subjects as sql, common} from '../sql'

export class SubjectsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<Subject | null> {
      return await this.db.oneOrNone(common.findByID, {tableName: 'subjects', id})
    }

    async findByName(name: string, args: pagination_args): Promise<Subject[] | null> {
      const pgArgs = parsePagination(args)
      const {limit, offset} = pgArgs
      return await this.db.manyOrNone(sql.findByName, {name, limit, offset})
    }
    
    async add(data: Subject) {
      return await this.db.one(sql.add, data)
    }

    async update(data: Subject) {
      return await this.db.result(sql.update, data)
    }

    async delete(id: string) {
      return await this.db.result(sql.delete, {id})
    }
    
    async listByCode(code: string, args: pagination_args) {
      const pgArgs = parsePagination(args)
      const {limit, offset} = pgArgs
      return await this.db.manyOrNone(sql.listByCode, {code_regex: `^${code} `, limit, offset})
    }
}