import { IDatabase, IMain, QueryFile } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { attendances_plan_b as AttendancePlanB } from '../models'
import { pagination_args } from "../modelsCustom";
import { attendances_plan_b as sql, common, students } from '../sql'

export class AttendancesPlanBRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<AttendancePlanB | null> {
      return await this.db.oneOrNone(common.findByID, {tableName: 'attendances_plan_b' ,id})
    }

    // async listAll(args: pagination_args): Promise<Attendance[] | null> {
    //   const pgArgs = parsePagination(args)
    //   const { limit, offset } = pgArgs
    //   return await this.db.manyOrNone(sql.listAll, {limit, offset})
    // }
    
    // async listByStudentID(student_id: string, args: pagination_args = {}): Promise<Attendance[] | null> {
    //   const pgArgs = parsePagination(args)
    //   const { limit, offset } = pgArgs
    //   return await this.db.manyOrNone(sql.listByStudentID, {student_id, limit, offset})
    // }

    async listByStudentAcademicTermID(options: {student_id: string, academic_term_id: string}): Promise<AttendancePlanB[] | null> {
      return await this.db.manyOrNone(sql.listByStudentAcademicTermID, options)
    }

    async listByStudentAcademicTermID_DateRange(options: {student_id: string, academic_term_id: string, time_start: Date, time_end: Date}): Promise<AttendancePlanB[] | null> {
      return await this.db.manyOrNone(sql.listByStudentAcademicTermID_DateRange, options)
    }

    async delete(id: String) {
      return await this.db.result(sql.delete, {id})
    }
}