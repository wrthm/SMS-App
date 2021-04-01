import { IDatabase, IMain, QueryFile } from "pg-promise";
import { students as Student } from '../models'
import { search_student_args } from '../modelsCustom'
import { student as sql, common} from '../sql'

export class StudentsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<Student | null> {
      return await this.db.oneOrNone(common.findByID, {tableName: 'students', id})
    }

    async findByNameOR(name: search_student_args): Promise<Student[] | null> {
      return await this.db.manyOrNone(sql.findByNameOR, name)
    }

    async findByNameAND(name: search_student_args): Promise<Student[] | null> {
      return await this.db.manyOrNone(sql.findByNameAND, name)
    }
    
    async add(data: Student) {
      return await this.db.one(sql.add, data)
    }

    async update(data: Student) {
      return await this.db.result(sql.update, data)
    }

    async delete(id: String) {
      return await this.db.result(sql.delete, {id})
    }

    async unenroll(id: String) {
      return await this.db.result(sql.unenroll, {id})
    }

    async unenrollAll(id: String) {
      return await this.db.result(sql.unenrollAll, {id})
    }
}