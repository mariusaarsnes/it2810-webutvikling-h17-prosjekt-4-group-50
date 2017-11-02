import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material'

@Component({
  selector: 'dialog',
  templateUrl: './dialog.html',
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
