import { CommonRepository } from './common'
import { CoursesRepository } from './courses'
import { DepartmentsRepository } from './departments'
import { AcademicTermsRepository } from './academic_terms'
import { StudentsRepository } from './students'
import { SubjectsRepository } from './subjects'

interface IExtensions {
    common: CommonRepository,
    courses: CoursesRepository,
    departments: DepartmentsRepository,
    academic_terms: AcademicTermsRepository,
    students: StudentsRepository,
    subjects: SubjectsRepository,
}

export {
    IExtensions,
    CoursesRepository,
    CommonRepository,
    DepartmentsRepository,
    AcademicTermsRepository,
    StudentsRepository,
    SubjectsRepository,
}