import { IDatabase, IMain, QueryFile } from "pg-promise";
import { pagination_args } from '../modelsCustom'
import { common } from '../sql'
import { parsePagination } from '../../utils/parsePagination'

export class CommonRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async listAll(args: pagination_args, tableName: string): Promise<any[]> {
        const pgArgs = parsePagination(args)
        const { limit, offset } = pgArgs
        return await this.db.manyOrNone(common.listAll, {tableName, limit, offset})
    }

}