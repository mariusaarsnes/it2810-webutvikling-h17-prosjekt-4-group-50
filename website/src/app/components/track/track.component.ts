import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {SongResponse} from "../../interfaces/song-response.interface";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  @Input() track: SongResponse;

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '80%',
      width: '70%'

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


