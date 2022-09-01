import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiBaseError } from "../classes/api/api-base-error";

@Injectable({
    providedIn: 'root'
  })
export class ErrorHandler {
    apiErrorHandler(snackBar: MatSnackBar, error: ApiBaseError):void{
        console.log(error);
        snackBar.open(this.ConcatErrorsMessages(error),undefined,{duration:3000})
    }

    private ConcatErrorsMessages(error: ApiBaseError): string {
        let errorString = '';
        error.errors.forEach(error => {
            errorString += error + '\n';
        });
        return errorString;
    }
}
