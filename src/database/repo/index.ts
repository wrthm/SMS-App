import { CommonRepository } from './common'
import { CoursesRepository } from './courses'

interface IExtensions {
    common: CommonRepository,
    courses: CoursesRepository,
}

export {
    IExtensions,
    CoursesRepository,
    CommonRepository,
}