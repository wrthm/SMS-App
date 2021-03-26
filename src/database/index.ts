import pgPromise, { IDatabase, IInitOptions, IMain } from 'pg-promise'
import { IExtensions, CoursesRepository, CommonRepository } from './repo'
import { DatabaseConfig } from '../config'

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions

const initOptions: IInitOptions<ExtendedProtocol> = {
    extend(obj: ExtendedProtocol, dc: any) {
        obj.courses = new CoursesRepository(obj, pgp)
        obj.common = new CommonRepository(obj, pgp)
    }
}

const pgp: IMain = pgPromise(initOptions)
const DatabaseService: ExtendedProtocol = pgp(DatabaseConfig)

export default DatabaseService