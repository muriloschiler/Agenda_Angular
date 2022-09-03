import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiBaseError } from 'src/app/shared/classes/api/api-base-error';
import { AuthUser } from 'src/app/shared/classes/entities/auth-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorHandlerService } from 'src/app/shared/services/Error/error-handler.service';

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
    private errorHandler: ErrorHandlerService,
    private router:Router
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
        const data = this.form.value as AuthUser
        const { token } = await this.authService.loginAsync(data); 
        this.authService.setToken(token);
        this.router.navigate(['dashboard','home'])
        
      }
    } catch (error) {
      this.errorHandler.apiErrorHandler(this.snackBar,error as ApiBaseError)      
    }
  }

}
