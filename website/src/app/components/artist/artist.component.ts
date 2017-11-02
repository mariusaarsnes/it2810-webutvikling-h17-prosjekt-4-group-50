import { Component, OnInit, Input } from '@angular/core';
import { Artist } from "./artist";
import {MatDialog} from '@angular/material';
import { DialogComponent} from "./dialog.component";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  @Input() artist: Artist;

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '350px',
      width: '500px'

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


