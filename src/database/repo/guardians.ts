import { IDatabase, IMain, QueryFile } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { propTrimOrNull } from "../../utils/validationUtils";
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

    async listAll(args: pagination_args): Promise<Guardian[]> {
      const pgArgs = parsePagination(args)
      const { limit, offset } = pgArgs
      return await this.db.manyOrNone(sql.listAll, {limit, offset})
  }

    async update(data: Guardian) {
      data.first_name = propTrimOrNull(data.first_name)
      data.middle_name = propTrimOrNull(data.middle_name)
      data.last_name = propTrimOrNull(data.last_name)
      data.address = propTrimOrNull(data.address)
      data.first_name_2 = propTrimOrNull(data.first_name_2)
      data.middle_name_2 = propTrimOrNull(data.middle_name_2)
      data.last_name_2 = propTrimOrNull(data.last_name_2)
      data.address_2 = propTrimOrNull(data.address_2)

      return await this.db.result(sql.update, data)
    }
}