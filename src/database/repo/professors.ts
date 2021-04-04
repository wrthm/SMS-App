import { IDatabase, IMain, QueryFile } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { professors as Professor } from '../models'
import { pagination_args, search_name_args } from '../modelsCustom'
import { professors as sql, common} from '../sql'

export class ProfessorsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<Professor | null> {
      return await this.db.oneOrNone(common.findByID, {tableName: 'professors', id})
    }

    async findByNameOR(name: search_name_args, args: pagination_args): Promise<Professor[] | null> {
      const pgArgs = parsePagination(args)
      return await this.db.manyOrNone(sql.findByNameOR, {name, pgArgs})
    }

    async findByNameAND(name: search_name_args, args: pagination_args): Promise<Professor[] | null> {
      const pgArgs = parsePagination(args)
      return await this.db.manyOrNone(sql.findByNameAND, {name, pgArgs})
    }
    
    async add(data: Professor) {
      return await this.db.one(sql.add, data)
    }

    async update(data: Professor) {
      return await this.db.result(sql.update, data)
    }

    async delete(id: String) {
      return await this.db.result(sql.delete, {id})
    }
}