import { IDatabase, IMain, QueryFile } from "pg-promise";
import { parsePagination } from "../../utils/parsePagination";
import { professors as Professor } from '../models'
import { pagination_args, search_name_args } from '../modelsCustom'
import { professors as sql } from '../sql'

export class ProfessorsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async findByID(id: string): Promise<Professor | null> {
      return await this.db.oneOrNone(sql.findByID, {id})
    }

    async findByNameOR(name: search_name_args, args: pagination_args): Promise<Professor[] | null> {
      const pgArgs = parsePagination(args)
      return await this.db.manyOrNone(sql.listByNameOR, {name, pgArgs})
    }

    async findByNameAND(name: search_name_args, args: pagination_args): Promise<Professor[] | null> {
      const pgArgs = parsePagination(args)
      return await this.db.manyOrNone(sql.listByNameAND, {name, pgArgs})
    }

    async listAll(args: pagination_args): Promise<Professor[]> {
      const pgArgs = parsePagination(args)
      const { limit, offset } = pgArgs
      return await this.db.manyOrNone(sql.listAll, {limit, offset})
    }
    
    async add(data: Professor) {
      return await this.db.one(sql.add, data)
    }

    async update(data: Professor) {
      return await this.db.result(sql.update, data)
    }

    async delete(id: String) {
      return await this.db.result(sql.delete, {id})
    }
}