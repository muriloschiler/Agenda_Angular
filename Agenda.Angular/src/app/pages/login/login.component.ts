import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiBaseError } from 'src/app/shared/classes/api/api-base-error';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { ErrorHandler } from 'src/app/shared/utils/error-handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form! : FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService : AuthService,
    private errorHandler: ErrorHandler
  ) {
    this.form = this.formBuilder.group({
      email: [null,[Validators.required,Validators.email]],
      password: [null,Validators.required]
    })
   }

  ngOnInit() {
  }

  isFormValid():boolean{
    const valid = this.form.valid
    if(!valid){
      this.form.markAllAsTouched()
      this.snackBar.open("Há campos inválidos no formulário!",undefined,{ duration: 3000 })
    }
    return valid
  }
  
  async loginAsync(): Promise<void>{
    try {
      if(this.isFormValid()){
        console.log("Formulario valido");
        
      }
    } catch (error) {
      this.errorHandler.apiErrorHandler(this.snackBar,error as ApiBaseError)      
    }
  }

}
