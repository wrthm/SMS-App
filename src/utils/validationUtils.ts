import { InvalidArgumentException, NotFoundException } from '../exceptions'

export const checkIfNull = (x: any, message?: string) => {
    if (x === null) {
        let err = (message) ? new NotFoundException(message) : new NotFoundException()
        throw err
    }
}
