import pgPromise, { IDatabase, IInitOptions, IMain } from 'pg-promise'
import { IExtensions, CoursesRepository } from './repo'
import { DatabaseConfig } from '../config'

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions

const initOptions: IInitOptions<ExtendedProtocol> = {
    extend(obj: ExtendedProtocol, dc: any) {
        obj.courses = new CoursesRepository(obj, pgp)
    }
}

const pgp: IMain = pgPromise(initOptions)
const db: ExtendedProtocol = pgp(DatabaseConfig)

export default db