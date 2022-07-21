import pgPromise, { IDatabase, IInitOptions, IMain } from 'pg-promise'
import * as Repos from './repo'
import { DatabaseConfig } from '../config'


type ExtendedProtocol = IDatabase<Repos.IExtensions> & Repos.IExtensions

const initOptions: IInitOptions<ExtendedProtocol> = {
    extend(obj: ExtendedProtocol, dc: any) {
        obj.common = new Repos.CommonRepository(obj, pgp)
        obj.courses = new Repos.CoursesRepository(obj, pgp)
        obj.departments = new Repos.DepartmentsRepository(obj, pgp)
        obj.academic_terms = new Repos.AcademicTermsRepository(obj, pgp)
        obj.students = new Repos.StudentsRepository(obj, pgp)
        obj.subjects = new Repos.SubjectsRepository(obj, pgp)
        obj.enrollments = new Repos.EnrollmentsRepository(obj, pgp)
        obj.grades = new Repos.GradesRepository(obj, pgp)
        obj.professors = new Repos.ProfessorsRepository(obj, pgp)
        obj.guardians = new Repos.GuardiansRepository(obj, pgp)
        obj.schedules = new Repos.SchedulesRepository(obj, pgp)
        obj.config = new Repos.ConfigRepository(obj, pgp)
        obj.course_schedules = new Repos.CourseSchedulesRepository(obj, pgp)
        obj.course_schedules_contents = new Repos.CourseSchedulesContentsRepository(obj, pgp)
    }
}

const pgp: IMain = pgPromise(initOptions)
const DatabaseService: ExtendedProtocol = pgp(DatabaseConfig)

export default DatabaseService