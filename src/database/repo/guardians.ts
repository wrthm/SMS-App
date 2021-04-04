import { IDatabase, IMain, QueryFile } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { guardians as Guardian } from '../models'
import { pagination_args, search_name_args } from '../modelsCustom'
import { guardians as sql, common} from '../sql'

export class GuardiansRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByStudentID(student_id: string): Promise<Guardian | null> {
      return await this.db.oneOrNone(sql.findByStudentID, {student_id})
    }

    async findByNameOR(name: search_name_args, args: pagination_args): Promise<Guardian[] | null> {
      const pgArgs = parsePagination(args)
      return await this.db.manyOrNone(sql.findByNameOR, {name, pgArgs})
    }

    async findByNameAND(name: search_name_args, args: pagination_args): Promise<Guardian[] | null> {
      const pgArgs = parsePagination(args)
      return await this.db.manyOrNone(sql.findByNameAND, {name, pgArgs})
    }

    async update(data: Guardian) {
      return await this.db.result(sql.update, data)
    }
}