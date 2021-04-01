import { IDatabase, IMain, QueryFile } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { academic_terms as AcademicTerms } from '../models'
import { pagination_args } from "../modelsCustom";
import { academic_term as sql, common} from '../sql'

export class AcademicTermsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<AcademicTerms | null> {
      return await this.db.oneOrNone(common.findByID, {tableName: 'academic_terms', id})
    }

    async findByName(name: string, args: pagination_args): Promise<AcademicTerms[] | null> {
      const pgArgs = parsePagination(args)
      const {limit, offset} = pgArgs
      return await this.db.manyOrNone(sql.findByName, {name, limit, offset})
    }
    
    async add(data: AcademicTerms) {
      return await this.db.one(sql.add, data)
    }

    async update(data: AcademicTerms) {
      return await this.db.result(sql.update, data)
    }

    async delete(id: String) {
      return await this.db.result(sql.delete, {id})
    }
}