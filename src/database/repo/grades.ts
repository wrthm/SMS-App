import { IDatabase, IMain, QueryFile } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { grades as Grade } from '../models'
import { pagination_args } from "../modelsCustom";
import { grades as sql} from '../sql'

export class GradesRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByIDs({enrollment_id, subject_id}: {enrollment_id: string, subject_id: string}): Promise<Grade | null> {
      return await this.db.oneOrNone(sql.findByIDs, {enrollment_id, subject_id})
    }

    async listByEnrollmentID(enrollment_id: string): Promise<Grade[] | null> {
      return await this.db.manyOrNone(sql.listByEnrollmentID, {enrollment_id})
    }
    
    async listAll(args: pagination_args): Promise<Grade[] | null> {
      const pgArgs = parsePagination(args)
      const { limit, offset } = pgArgs
      return await this.db.manyOrNone(sql.listAll, {limit, offset})
    }

    async add(data: Grade) {
      return await this.db.none(sql.add, data)
    }

    async update(data: Grade) {
      return await this.db.result(sql.update, data)
    }

    // async delete(id: String) {
    //   return await this.db.result(sql.delete, {id})
    // }
}