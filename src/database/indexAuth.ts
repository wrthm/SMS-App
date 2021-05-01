import pgPromise, { IDatabase, IInitOptions, IMain } from 'pg-promise'
import * as Repos from './repo'
import { DatabaseAuthConfig } from '../config'


type ExtendedProtocolAuth = IDatabase<Repos.IExtensionsAuth> & Repos.IExtensionsAuth

const initOptions: IInitOptions<ExtendedProtocolAuth> = {
    extend(obj: ExtendedProtocolAuth, dc: any) {
        obj.common = new Repos.CommonRepository(obj, pgp)
        obj.sessions = new Repos.SessionsRepository(obj, pgp)
        obj.students_credentials = new Repos.StudentsCredentialsRepository(obj, pgp)
        obj.faculties = new Repos.FacultiesRepository(obj, pgp)
        obj.component_clients = new Repos.SystemComponentsClientsRepository(obj, pgp)
    }
}

const pgp: IMain = pgPromise(initOptions)
const AuthService: ExtendedProtocolAuth = pgp(DatabaseAuthConfig)

export default AuthService