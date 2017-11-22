import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlbumResponse} from "../../interfaces/album-response.interface";
import {HostListener} from "@angular/core";

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
    show: boolean = false;
    album: AlbumResponse;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, public thisDialogRef: MatDialogRef<DialogComponent>) {
	}

	//Closes the dialog on click
	closeDialog() {
		this.thisDialogRef.close();
	}

	ngOnInit() {
    }


    //Functionality for album click, scrolls to album.
    intoView(album) {
	    this.album = album;
	    this.show = true;
        document.getElementById("type-dialog").scrollIntoView();
    }

}
