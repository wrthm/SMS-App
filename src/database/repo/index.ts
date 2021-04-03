import { CommonRepository } from './common'
import { CoursesRepository } from './courses'
import { DepartmentsRepository } from './departments'
import { AcademicTermsRepository } from './academic_terms'
import { StudentsRepository } from './students'
import { SubjectsRepository } from './subjects'
import { EnrollmentsRepository } from './enrollments'
import { GradesRepository } from './grades'

interface IExtensions {
    common: CommonRepository,
    courses: CoursesRepository,
    departments: DepartmentsRepository,
    academic_terms: AcademicTermsRepository,
    students: StudentsRepository,
    subjects: SubjectsRepository,
    enrollments: EnrollmentsRepository,
    grades: GradesRepository,
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
}