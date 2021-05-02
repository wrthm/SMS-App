import { APIException } from "./APIException"

export class UnauthorizedException extends APIException {
    constructor(message: string = 'Client unauthorized to access this endpoint') {
        const status: number = 401
        super(status, message)
    }
}