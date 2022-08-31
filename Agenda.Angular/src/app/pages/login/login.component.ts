import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form! : FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
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
    if(valid){
      this.form.markAllAsTouched();
      this.snackBar.open("Há campos inválidos no formulário!", undefined, { duration: 3000 })
    }
    return valid;
  }

}
