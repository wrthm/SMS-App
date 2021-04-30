import { IDatabase, IMain } from "pg-promise";
import { faculties as faculty } from '../../modelsAuth'
import { faculties as sql, common} from '../../sql'

export class SessionsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async create(data: faculty) {
        return await this.db.result(sql.add, data)
    }
}