import pgPromise, { IDatabase, IInitOptions, IMain } from 'pg-promise'
import { IExtensions, CoursesRepository, CommonRepository, DepartmentsRepository } from './repo'
import { DatabaseConfig } from '../config'

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions

const initOptions: IInitOptions<ExtendedProtocol> = {
    extend(obj: ExtendedProtocol, dc: any) {
        obj.common = new CommonRepository(obj, pgp)
        obj.courses = new CoursesRepository(obj, pgp)
        obj.departments = new DepartmentsRepository(obj, pgp)
    }
}

const pgp: IMain = pgPromise(initOptions)
const DatabaseService: ExtendedProtocol = pgp(DatabaseConfig)

export default DatabaseService