import { CommonRepository } from './common'
import { CoursesRepository } from './courses'
import { DepartmentsRepository } from './departments'
import { AcademicTermsRepository } from './academic_terms'
import { StudentsRepository } from './students'
import { SubjectsRepository } from './subjects'
import { EnrollmentsRepository } from './enrollments'
import { GradesRepository } from './grades'
import { ProfessorsRepository } from './professors'
import { GuardiansRepository } from './guardians'
import { AttendancesRepository } from './attendances'
import { SchedulesRepository } from './schedules'
import { ConfigRepository } from './config'
import { CourseSchedulesRepository } from './course_schedules'
import { CourseSchedulesContentsRepository } from './course_schedules_contents'
import { SessionsRepository } from './auth/session'
import { StudentsCredentialsRepository } from './auth/students_credentials'
import { FacultiesRepository } from './faculties'
import { SystemComponentsClientsRepository } from './auth/system_components_clients'

interface IExtensions {
    common: CommonRepository,
    courses: CoursesRepository,
    departments: DepartmentsRepository,
    academic_terms: AcademicTermsRepository,
    students: StudentsRepository,
    subjects: SubjectsRepository,
    enrollments: EnrollmentsRepository,
    grades: GradesRepository,
    professors: ProfessorsRepository,
    guardians: GuardiansRepository,
    attendances: AttendancesRepository,
    schedules: SchedulesRepository,
    config: ConfigRepository,
    course_schedules: CourseSchedulesRepository,
    course_schedules_contents: CourseSchedulesContentsRepository,
}

interface IExtensionsAuth {
    common: CommonRepository,
    sessions: SessionsRepository,
    students_credentials: StudentsCredentialsRepository,
    faculties: FacultiesRepository,
    component_clients: SystemComponentsClientsRepository,
}

export {
    IExtensions,
    IExtensionsAuth,
    CoursesRepository,
    CommonRepository,
    DepartmentsRepository,
    AcademicTermsRepository,
    StudentsRepository,
    SubjectsRepository,
    EnrollmentsRepository,
    GradesRepository,
    ProfessorsRepository,
    GuardiansRepository,
    AttendancesRepository,
    SchedulesRepository,
    ConfigRepository,
    CourseSchedulesRepository,
    CourseSchedulesContentsRepository,
    SessionsRepository,
    StudentsCredentialsRepository,
    FacultiesRepository,
    SystemComponentsClientsRepository,
}