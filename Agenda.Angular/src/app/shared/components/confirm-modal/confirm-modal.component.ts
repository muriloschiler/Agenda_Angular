import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmModalConfig } from './classes/confirm-modal-config';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public config: ConfirmModalConfig,
    private matDialogRef: MatDialogRef<ConfirmModalComponent>
  ) { }

  confirm(confirmed: boolean): void {
    this.matDialogRef.close(confirmed);
  }

}
