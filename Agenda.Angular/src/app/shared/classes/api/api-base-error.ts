export class ApiBaseError {
    errors!: ErrorObject[]
    message!: string;
}

class ErrorObject {
    propertyName!: string;
    errorMessage!: string;
    attemptedValue!: object;
    errorCode!: number;
}