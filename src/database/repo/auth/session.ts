import { IDatabase, IMain } from "pg-promise";
import { sessions } from '../../modelsAuth'
import { auth_sessions as sql, common} from '../../sql'

export class SessionsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async create(data: sessions) {
        return await this.db.result(sql.create, data)
    }
}