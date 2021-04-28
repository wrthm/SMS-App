import { IDatabase, IMain, QueryFile } from "pg-promise";
import { config as sql} from '../sql'
import { configuration } from '../models'

export class ConfigRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async getAdd(key: string): Promise<string> {
        return await this.db.task(async t => {
            const keyCheck = await t.oneOrNone(sql.exists, {key})
            if (!keyCheck.exists) {
                await t.none(sql.add, {key: key, value: null})
            }
            return await t.one(sql.get, {key})
        })
    }

    async get(key: string): Promise<string | null> {
        return await this.db.oneOrNone(sql.get, {key})
    }

    async set(key: string, value: string | null = null) {
        return await this.db.result(sql.set, {key, value})
    }

    async list() {
        const result: configuration[] = await this.db.many(sql.list)
        const resultTransformed: { [index: string] : any } = { }
        result.forEach(element => {
            const { key, value, updated_at } = element
            resultTransformed[key] = {value, updated_at}
        })
        return resultTransformed
    }
}