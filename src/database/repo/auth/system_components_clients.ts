import { IDatabase, IMain } from "pg-promise";
import { system_components_clients as sys_comp_clients } from '../../modelsAuth'
import { auth_sys_components_clients as sql, common} from '../../sql'

export class SystemComponentsClientsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async add(data: sys_comp_clients) {
        return await this.db.one(sql.add, data)
    }

    async revoke(client_name: string) {
        return await this.db.result(sql.revoke, {client_name})
    }

    // gets by API key, even if it's revoked
    async findByKey(api_key: string) {
        return await this.db.oneOrNone(sql.findByKey, {api_key})
    }

    // gets by API key only if it's not revoked; the function to use when authenticating system component client
    async findByNotRevokedKey(api_key: string): Promise<sys_comp_clients | null> {
        return await this.db.oneOrNone(sql.findByNotRevokedKey, {api_key})
    }

    async listAll() {
        return await this.db.manyOrNone(sql.listAll)
    }
}