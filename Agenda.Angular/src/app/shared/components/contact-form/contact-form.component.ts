import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgendaAdminService } from '../../services/agenda-admin.service';
import { AgendaService } from '../../services/agenda.service';
import { ApiBaseService } from '../../services/core/api-base.service';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public config: ModalConfig,
    private formBuilder: FormBuilder,
    private agendaService: AgendaService,
    private agendaAdminService: AgendaAdminService,
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      id:[null],
      name: [null, [Validators.required]],
      phones: this.formBuilder.array([]),
    })
  }

  async ngOnInit() {
    await this.verifyIfIsAdminAsync();
    this.isEditMode = !!this.config.data.id;
    if (this.isEditMode) {
      await this.getContactAsync();
    }
  }

  async verifyIfIsAdminAsync(): Promise<void> {
    this.isAdmin = RegExp(`\/admin\/agenda`, 'gi').test(this.router.url);
    if (this.isAdmin) {
      this.form.addControl('userId', new FormControl(null, [Validators.required]));
    }
    this.service = this.isAdmin ? this.agendaAdminService : this.agendaService;
  }

  async getContactAsync(): Promise<void> {
    console.log("EDIT MODE")
  }

}
