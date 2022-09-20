import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiBaseError } from "../../classes/api/api-base-error";
import { ErrorObject } from "./classes/error-object";

@Injectable({
    providedIn: 'root'
  })
export class ErrorHandlerService {
    error!: ErrorObject
    
    apiErrorHandler(snackBar: MatSnackBar, apiBaseError: ApiBaseError):void{
        this.error = apiBaseError.errors[0]
        console.log(apiBaseError);
        snackBar.open(this.error.errorMessage,undefined,{duration:3000})
    }
}
