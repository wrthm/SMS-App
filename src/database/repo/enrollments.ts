import { IDatabase, IMain, QueryFile } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { enrollments as Enrollment } from '../models'
import { pagination_args } from "../modelsCustom";
import { enrollment as sql, common, student } from '../sql'

export class EnrollmentsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<Enrollment | null> {
      return await this.db.oneOrNone(sql.findByID, {id})
    }

    async listAll(args: pagination_args): Promise<Enrollment[] | null> {
      const pgArgs = parsePagination(args)
      const { limit, offset } = pgArgs
      return await this.db.manyOrNone(sql.listAll, {limit, offset})
    }
    
    async listByStudentID(student_id: string): Promise<Enrollment[] | null> {
      return await this.db.manyOrNone(sql.listByStudentID, {student_id})
    }

    async add(data: Enrollment) {
      return await this.db.task(async t => {
        const { student_id } = data

        // check if student exists
        const row = await t.oneOrNone(common.exists, {tableName: 'students', id: student_id})
        if (row.exists) {
          // check if student is already enrolled
          const enrollCheck = await t.oneOrNone(student.isEnrolled, {id: student_id})
          if (!enrollCheck.exists) {
            const result = await this.db.one(sql.add, data)
            await this.db.none(student.enroll, {id: student_id})
            return {success: true, result}
          } else {
            return {success: false, message: "Student is already enrolled"}
          }
        } else {
          return {success: false, message: "Student does not exist"}
        }
      })
    }

    async delete(id: String) {
      return await this.db.task(async t => {
        // check if enrollment exists
        const row = await t.oneOrNone(common.exists, {tableName: 'enrollments', id: id})
        if (row.exists) {
          // get the value of student_id from the enrollment
          const data = await t.one(sql.getStudentID, {id})
          await this.db.none(student.unenroll, {id: data.student_id})
          await this.db.result(sql.delete, {id})
          return {success: true}
        } else {
          return {success: false}
        }
      })
    }
}