import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.css']
})

export class DialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any, public thisDialogRef: MatDialogRef<DialogComponent>) {
	}
	closeDialog() {
		this.thisDialogRef.close();
	}
}
