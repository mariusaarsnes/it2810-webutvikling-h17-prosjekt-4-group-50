import { Component, OnInit, Input } from '@angular/core';
import { ArtistResponse } from "../../interfaces/artist-response.interface";
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  @Input() artist: ArtistResponse;

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


