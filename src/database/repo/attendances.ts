import { IDatabase, IMain, QueryFile } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { attendances as Attendance } from '../models'
import { pagination_args } from "../modelsCustom";
import { attendances as sql, common, students } from '../sql'

export class AttendancesRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<Attendance | null> {
      return await this.db.oneOrNone(common.findByID, {tableName: 'attendances' ,id})
    }

    async listAll(args: pagination_args): Promise<Attendance[] | null> {
      const pgArgs = parsePagination(args)
      const { limit, offset } = pgArgs
      return await this.db.manyOrNone(sql.listAll, {limit, offset})
    }
    
    async listByStudentID(student_id: string, args: pagination_args = {}): Promise<Attendance[] | null> {
      const pgArgs = parsePagination(args)
      const { limit, offset } = pgArgs
      return await this.db.manyOrNone(sql.listByStudentID, {student_id, limit, offset})
    }

    async listByStudentAcademicTermID(student_id: string, academic_term_id: string, args: pagination_args = {}): Promise<Attendance[] | null> {
      const pgArgs = parsePagination(args)
      const { limit, offset } = pgArgs
      return await this.db.manyOrNone(sql.listByStudentID, {student_id, academic_term_id, limit, offset})
    }

    async delete(id: String) {
      return await this.db.task(async t => {
        const row = await t.oneOrNone(common.exists, {tableName: 'attendances', id: id})
        if (row.exists) {
          await t.none(sql.delete, {id})
          return {success: true}
        } else {
          return {success: false}
        }
      })
    }
}