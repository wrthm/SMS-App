import { APIException } from "./APIException";

export class InvalidArgumentException extends APIException {
    constructor(message: string = 'Invalid argument/s supplied') {
        let status: number = 400
        super(status, message)
    }
}