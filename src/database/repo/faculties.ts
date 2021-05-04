import { IDatabase, IMain } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { faculties as Faculty } from '../modelsAuth'
import { faculties_put as FacultyPut, pagination_args } from '../modelsCustom'
import { faculties as sql, common} from '../sql'

type FacultyPrivilege = { privilege: number }
export type FacultyGetPassword = { password: string }
export type FacultyUpdatePassword = { password: string, id: string }
export class FacultiesRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async add(data: Faculty) {
        return await this.db.one(sql.add, data)
    }

    async findByID(id: string): Promise<Faculty | null> {
        return await this.db.oneOrNone(sql.findByID, {id})
    }

    async findByUsername(username: string): Promise<Faculty | null> {
        return await this.db.oneOrNone(sql.findByUsername, {username})
    }

    async getPrivilege(id: string): Promise<FacultyPrivilege | null> {
        return await this.db.oneOrNone(sql.getPrivilege, {id})
    }

    async getPassword(id: string): Promise<FacultyGetPassword | null> {
        return await this.db.oneOrNone(sql.getPassword, {id})
    }

    async listAll(args: pagination_args) {
        const pgArgs = parsePagination(args)
        const { limit, offset } = pgArgs
        return await this.db.manyOrNone(sql.listAll, {limit, offset})
    }

    async update(data: FacultyPut) {
        return await this.db.result(sql.update, data)
    }

    async updatePasswordOnly(data: FacultyUpdatePassword) {
        return await this.db.result(sql.updatePasswordOnly, data)
    }
    
    async delete(id: string) {
        return await this.db.result(sql.delete, {id})
    }
}