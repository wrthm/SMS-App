import { IDatabase, IMain, QueryFile } from "pg-promise";
import { course as Course } from '../models'
import { course as sql, common} from '../sql'

export class CoursesRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<Course | null> {
      return this.db.oneOrNone(common.findByID, {_table: 'courses' ,id})
    }

    async findByName(name: string): Promise<Course[] | null> {
      return this.db.manyOrNone(sql.findByName, {name})
    }

    async findAll(): Promise<Course[]> {
      return this.db.manyOrNone(sql.findAll)
    }
    
    async add(data: Course) {
      return this.db.one(sql.add, data)
    }

    async update(data: Course) {
      return await this.checkIfIDExistsThenQuery(data, 'courses', sql.update)
    }

    async delete(data: Course) {
      return await this.checkIfIDExistsThenQuery(data, 'courses', sql.delete)
    }


    // TODO: move this to outside, maybe in utils?
    async checkIfIDExistsThenQuery(data: any, table: string, thenQueryFile: QueryFile) {
      const result = await this.db.task(t => {
        data._table = table
        return t.one(common.exists, data)
                .then((row: any) => {
                  const exists = row.exists
                  if (exists) {
                    return t.none(thenQueryFile, data)
                            .then( () => {
                              return exists
                            })
                  }
                  return exists
                })
      })
      return result
    }
    
    
    async exists(id: string) {
      return this.db.one(common.exists, {table: 'courses', id: id})
    }
}