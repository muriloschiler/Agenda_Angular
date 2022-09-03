import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiBaseError } from "../../classes/api/api-base-error";

@Injectable({
    providedIn: 'root'
  })
export class ErrorHandlerService {
    apiErrorHandler(snackBar: MatSnackBar, error: ApiBaseError):void{
        console.log(error);
        snackBar.open(error.errors[0].errorMessage,undefined,{duration:3000})
    }
}
