import { IDatabase, IMain, QueryFile } from "pg-promise";
import { departments as Department } from '../models'
import { department as sql, common} from '../sql'

export class DepartmentsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<Department | null> {
      return await this.db.oneOrNone(common.findByID, {tableName: 'departments', id})
    }

    async findByName(name: string): Promise<Department[] | null> {
      return await this.db.manyOrNone(sql.findByName, {name})
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