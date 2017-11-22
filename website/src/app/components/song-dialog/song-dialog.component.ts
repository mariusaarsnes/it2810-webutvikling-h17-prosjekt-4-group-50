import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-song-dialog',
    templateUrl: './song-dialog.component.html',
    styleUrls: ['./song-dialog.component.css']
})
export class SongDialogComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public thisDialogRef: MatDialogRef<SongDialogComponent>) {
    }

    // Closes the dialog when button is clicked.
    closeDialog() {
        this.thisDialogRef.close();
    }

    ngOnInit() {
    }

}
