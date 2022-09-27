import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiBaseError } from 'src/app/shared/classes/api/api-base-error';
import { Enumeration } from 'src/app/shared/classes/entities/core/enumeration';
import { User } from 'src/app/shared/classes/entities/user/user';
import { ModalConfig } from 'src/app/shared/components/modal/classes/modal-config';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/Error/error-handler.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form!:FormGroup; 
  roles: Enumeration[] = new Array<Enumeration>();
  isEditMode = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public config: ModalConfig,
    private matDialogRef: MatDialogRef<ModalComponent>,
    private formBuilder:FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private errorHandlerService:ErrorHandlerService

  ) {
      this.form = this.formBuilder.group({
        id: [0],
        name: [null, [Validators.required]],
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        userRoleId: [null, [Validators.required]],
      })
   }

  ngOnInit(): void {
    this.getUserRoles()
  }

  async getUserRoles(): Promise<void> {
    this.roles = await this.userService.getUserRoles();
    this.isEditMode = !! this.config.data.id
    if(this.isEditMode){
      this.getUserAsync();
    }
  }

  async getUserAsync():Promise<void>{
    const data = await this.userService.GetByIdAsync(this.config.data.id)
    this.form.patchValue({ ...data, userRoleId: data.userRole.id }); 
  }

  isFormValid(): boolean {
    const valid = this.form.valid;
    if (!valid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Há campos inválidos no formulário!', undefined, { duration: 3000 });
    }
    return valid;
  }

  async saveUserAsync(): Promise<void> {
    try {
      if (this.isFormValid()) {
        debugger
        const data = this.form.value as User;
        data.id ?
          await this.userService.updateAsync(data, data.id):
          await this.userService.createAsync(data);
        this.snackBar.open('Novo usuário salvo com sucesso!', undefined, { duration: 3000 });
        this.matDialogRef.close(true);
      }
    } catch ({ error }) {
      this.errorHandlerService.apiErrorHandler(this.snackBar, error as ApiBaseError);
    }
  }

}
