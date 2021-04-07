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
}

export {
    IExtensions,
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
}