import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Enumeration } from '../../classes/entities/core/enumeration';
import { Phone } from '../../classes/entities/phone';
import { ReducedUser } from '../../classes/entities/user/reduced-user';
import { User } from '../../classes/entities/user/user';
import { PhoneTypes } from '../../enums/phone-types';
import { AgendaAdminService } from '../../services/agenda-admin.service';
import { AgendaService } from '../../services/agenda.service';
import { ApiBaseService } from '../../services/core/api-base.service';
import { UserService } from '../../services/user.service';
import { ModalConfig } from '../modal/classes/modal-config';

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
  reducedUser!:ReducedUser[];
  phoneTypes!:Enumeration[]

  get phonesFieldArray(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public config: ModalConfig,
    private formBuilder: FormBuilder,
    private agendaService: AgendaService,
    private agendaAdminService: AgendaAdminService,
    private userService: UserService,
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      id:[null],
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

  async getContactToUpdateAsync(): Promise<void> {
    console.log("EDIT MODE")
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
    this.reducedUser = await this.userService.getReducedUsers();
  }
  
  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const isValid = new RegExp(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}/).test(control.value);
    if (isValid) {
      return null;
    }
    return { formattedNumber: { value: control.value } }
  }
}
