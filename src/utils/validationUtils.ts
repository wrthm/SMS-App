import { InvalidArgumentException, NotFoundException } from '../exceptions'
import { validate } from 'uuid'

export function checkIfNull(x: any, message?: string) {
    if (x === null) {
        let err = (message) ? new NotFoundException(message) : new NotFoundException()
        throw err
    }
}

export function isValidUUID(uuid: string) {
    if (!validate(uuid)) {
        throw new InvalidArgumentException('Invalid ID supplied')
    }
}

export function validateCourse(course: object): boolean {
    // TODO: add valid characters & character limit check
    return 'name' in course
}