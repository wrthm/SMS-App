import { CommonRepository } from './common'
import { CoursesRepository } from './courses'
import { DepartmentsRepository } from './departments'
import { AcademicTermsRepository } from './academic_terms'

interface IExtensions {
    common: CommonRepository,
    courses: CoursesRepository,
    departments: DepartmentsRepository,
    academic_terms: AcademicTermsRepository,
}

export {
    IExtensions,
    CoursesRepository,
    CommonRepository,
    DepartmentsRepository,
    AcademicTermsRepository,
}