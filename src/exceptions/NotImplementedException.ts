import { APIException } from "./APIException";

export class NotImplementedException extends APIException {
    constructor(message: string = 'Method is not implemented') {
        let status: number = 501
        super(status, message)
    }
}