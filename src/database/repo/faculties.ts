import { IDatabase, IMain } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { faculties as Faculty } from '../modelsAuth'
import { faculties_put as FacultyPut, pagination_args } from '../modelsCustom'
import { faculties as sql, common} from '../sql'

export class FacultiesRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async add(data: Faculty) {
        return await this.db.one(sql.add, data)
    }

    async findByID(id: string): Promise<Faculty | null> {
        return await this.db.oneOrNone(sql.findByID, {id})
    }

    async listAll(args: pagination_args) {
        const pgArgs = parsePagination(args)
        const { limit, offset } = pgArgs
        return await this.db.manyOrNone(sql.listAll, {limit, offset})
    }

    async update(data: FacultyPut) {
        return await this.db.result(sql.update, data)
    }
    
    async delete(id: string) {
        return await this.db.result(sql.delete, {id})
    }
}