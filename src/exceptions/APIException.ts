export class APIException extends Error {
    status: number
    message: string
    constructor(status: number, message: string, isClientError: boolean = true) {
        super(message)
        if (isClientError) delete this.stack
        this.status = status
        this.message = message
    }
}