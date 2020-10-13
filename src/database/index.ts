import pgPromise, { IDatabase, IInitOptions, IMain } from 'pg-promise'
import { IExtensions, CoursesRepository } from './repo'

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions

const initOptions: IInitOptions<ExtendedProtocol> = {
    extend(obj: ExtendedProtocol, dc: any) {
        obj.courses = new CoursesRepository(obj, pgp)
    }
}

const pgp: IMain = pgPromise(initOptions)
const db: ExtendedProtocol = pgp({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

export default db