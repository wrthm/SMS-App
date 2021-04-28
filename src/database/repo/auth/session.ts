import { IDatabase, IMain } from "pg-promise";
import { sessions } from '../../modelsAuth'
import { academic_terms as sql, common} from '../../sql'

export class SessionsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    
}