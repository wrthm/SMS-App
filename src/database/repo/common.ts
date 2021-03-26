import { IDatabase, IMain, QueryFile } from "pg-promise";
import { pagination_args } from '../modelsCustom'
import { common } from '../sql'

export class CommonRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async listAll(args: pagination_args, tableName: string): Promise<any[]> {
        let { page, limit } = args
        
        if (!page) {
            page = 1
        } else {
            page = Number(page)
        }
        if (!limit) {
            limit = 50
        } else {
            limit = Number(limit)
        }
        
        const offset = (page - 1) * limit
        return await this.db.manyOrNone(common.listAll, {tableName, limit, offset})
    }

}