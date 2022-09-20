import { ErrorObject } from "../../services/Error/classes/error-object";

export class ApiBaseError {
    errors!: ErrorObject[]
    message!: string;
}