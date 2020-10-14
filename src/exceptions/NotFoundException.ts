import { APIException } from "./APIException";

export class NotFoundException extends APIException {
    constructor(message: string = 'Resource not found') {
        let status: number = 404
        super(status, message)
    }
}