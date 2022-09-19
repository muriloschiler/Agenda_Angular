import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalConfig } from '../modal/classes/modal-config';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  form!:FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public config: ModalConfig,
    private formBuilder: FormBuilder,
  ) { 
    this.form = this.formBuilder.group({
      id:[null],
      name: [null, [Validators.required]],
      phones: this.formBuilder.array([]),
    })
  }

  ngOnInit() {
  }

}
