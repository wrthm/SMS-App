import { IDatabase, IMain } from "pg-promise";
import { course as Course } from '../models'
import { course as sql} from '../sql'

export class CoursesRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {
        /*
          If your repository needs to use helpers like ColumnSet,
          you should create it conditionally, inside the constructor,
          i.e. only once, as a singleton.
        */
    }

    async findAll(): Promise<Course[]> {
      return this.db.manyOrNone(sql.findAll)
    }

    // CONTINUE WORKING HERE!!!!!!!!!!!!!!!!!




    
}