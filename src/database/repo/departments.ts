import { IDatabase, IMain, QueryFile } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { departments as Department } from '../models'
import { pagination_args } from "../modelsCustom";
import { department as sql, common} from '../sql'

export class DepartmentsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<Department | null> {
      return await this.db.oneOrNone(common.findByID, {tableName: 'departments', id})
    }

    async findByName(name: string, args: pagination_args): Promise<Department[] | null> {
      const pgArgs = parsePagination(args)
      const {limit, offset} = pgArgs
      return await this.db.manyOrNone(sql.findByName, {name, limit, offset})
    }
    
    async add(data: Department) {
      return await this.db.one(sql.add, data)
    }

    async update(data: Department) {
      return await this.db.result(sql.update, data)
    }

    async delete(id: String) {
      return await this.db.result(sql.delete, {id})
    }
}