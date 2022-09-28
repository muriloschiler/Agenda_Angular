import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiBaseError } from '../../classes/api/api-base-error';
import { Enumeration } from '../../classes/entities/core/enumeration';
import { Phone } from '../../classes/entities/phone';
import { ReducedUser } from '../../classes/entities/user/reduced-user';
import { PhoneTypes } from '../../enums/phone-types';
import { AgendaAdminService } from '../../services/agenda-admin.service';
import { AgendaService } from '../../services/agenda.service';
import { ApiBaseService } from '../../services/core/api-base.service';
import { ErrorHandlerService } from '../../services/Error/error-handler.service';
import { UserService } from '../../services/user.service';
import { ModalConfig } from '../modal/classes/modal-config';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  form!:FormGroup;
  isAdmin = false;
  isEditMode=false;
  service!:ApiBaseService<any>;
  reducedUsers!:ReducedUser[];
  phoneTypes!:Enumeration[];

  get phonesFieldArray(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public config: ModalConfig,
    private matDialogRef: MatDialogRef<ModalComponent>,
    private formBuilder: FormBuilder,
    private agendaService: AgendaService,
    private agendaAdminService: AgendaAdminService,
    private userService: UserService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private errorHandlerService: ErrorHandlerService,
    private snackBar: MatSnackBar,
  ) { 
    this.form = this.formBuilder.group({
      id:[0],
      name: [null, [Validators.required]],
      phones: this.formBuilder.array([])
    })
  }

  async ngOnInit() {
    await this.verifyIfIsAdminAsync();
    await this.getPhoneTypesAsync();
    this.isEditMode = !!this.config.data.id;
    if (this.isEditMode) {
      await this.getContactToUpdateAsync();
    }
  }

  async verifyIfIsAdminAsync(): Promise<void> {
    this.isAdmin = RegExp(`\/admin\/agenda`, 'gi').test(this.router.url);
    if (this.isAdmin) {
      this.form.addControl('userId', new FormControl(null, [Validators.required]));
      await this.getAllUsersAsync();
    }
    this.service = this.isAdmin ? this.agendaAdminService : this.agendaService;
  }

  addPhoneForm(data?:Phone){
    this.phonesFieldArray.push(
      this.formBuilder.group({
        formattedNumber: [data?.formattedNumber,[Validators.required,this.phoneValidator]],
        description: [data?.description, [Validators.required]],
        phoneTypeId: [data?.phoneType.id, [Validators.required]],
      })
    )
  }

  removePhoneForm(index: number): void {
    this.phonesFieldArray.removeAt(index);
  }

  async getContactToUpdateAsync(): Promise<void> {
    try {
      const data = await this.service.GetByIdAsync(this.config.data.id);
      this.form.get('id')?.setValue(data.id);
      this.form.get('name')?.setValue(data.name);
      data.phones.forEach((x: Phone) => this.addPhoneForm(x));
      if (this.isAdmin) {
        this.form.get('userId')?.setValue(data.user.id);
      }
      this.cdRef.detectChanges();
    } catch ({ error }) {
      this.errorHandlerService.apiErrorHandler(this.snackBar, error as ApiBaseError)
    }
  }

  private async getPhoneTypesAsync(): Promise<void> {
    this.phoneTypes = await this.agendaService.getPhoneTypes();
  }

  

  getMaskPhone(index: number): string {
    return this.phonesFieldArray.at(index).get("phoneTypeId")?.value === PhoneTypes.Cellphone
      ? '(00) 00000-0000'
      : '(00) 0000-0000'
  }

  private async getAllUsersAsync():Promise<void>{
    this.reducedUsers = await this.userService.getReducedUsers();
  }
  
  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const isValid = new RegExp(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}/).test(control.value);
    if (isValid) {
      return null;
    }
    return { formattedNumber: { value: control.value } }
  }

  async saveContactAsync(): Promise<void> {
    try {
      if (this.isFormValid()) {
        const data = this.form.value;
        data.id ?
          await this.service.updateAsync(data, data.id) :
          await this.service.createAsync(data);
        this.snackBar.open('Novo contato salvo com sucesso!', undefined, { duration: 3000 });
        this.matDialogRef.close(true);
      }
    } catch ({ error }) {
      this.errorHandlerService.apiErrorHandler(this.snackBar, error as ApiBaseError);
    }
  }

  isFormValid(): boolean {
    const valid = this.form.valid;
    if (!valid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Há campos inválidos no formulário!', undefined, { duration: 3000 });
    }
    return valid;
  }

}
