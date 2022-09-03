import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ConfirmModalConfig } from '../classes/confirm-modal-config';
import { ConfirmModalComponent } from '../confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {
  closed = new EventEmitter<boolean>();

  constructor(private matDialog: MatDialog) {}

  open(data: ConfirmModalConfig): void {
    const dialog = this.matDialog.open(ConfirmModalComponent, { data });

    dialog.afterClosed()
      .pipe(take(1))
      .subscribe((result: boolean) => {
        this.closed.emit(result);
      });
  }
}
