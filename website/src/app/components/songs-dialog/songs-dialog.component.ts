import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-songs-dialog',
  templateUrl: './songs-dialog.component.html',
  styleUrls: ['./songs-dialog.component.css']
})
export class SongsDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public thisDialogRef: MatDialogRef<SongsDialogComponent>) {
    }

    closeDialog() {
        this.thisDialogRef.close();
    }

}
