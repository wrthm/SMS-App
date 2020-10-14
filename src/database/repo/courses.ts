import { IDatabase, IMain } from "pg-promise";
import { course as Course } from '../models'
import { course as sql} from '../sql'

export class CoursesRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<Course | null> {
      return this.db.oneOrNone(sql.findByID, {id})
    }

    async findByName(name: string): Promise<Course[] | null> {
      return this.db.manyOrNone(sql.findByName, {name})
    }

    async findAll(): Promise<Course[]> {
      return this.db.manyOrNone(sql.findAll)
    }
    
    async add(data: Course) {
      return this.db.one(sql.add, {data})
    }
}