import { IDatabase, IMain } from "pg-promise";
import { system_components_clients as sys_comp_clients } from '../../modelsAuth'
import { auth_sys_components_clients as sql, common} from '../../sql'

export class StudentsCredentialsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async add(data: sys_comp_clients) {
        return await this.db.one(sql.add, data)
    }

    async revoke(api_key: string) {
        return await this.db.result(sql.revoke, {api_key})
    }

    // gets by API key, even if it's revoked
    async findByKey(api_key: string) {
        return await this.db.result(sql.findByKey, {api_key})
    }

    // gets by API key only if it's not revoked; the function to use when authenticating system component client
    async findByNotRevokedKey(api_key: string) {
        return await this.db.result(sql.findByNotRevokedKey, {api_key})
    }

    async listAll() {
        return await this.db.manyOrNone(sql.listAll)
    }
}