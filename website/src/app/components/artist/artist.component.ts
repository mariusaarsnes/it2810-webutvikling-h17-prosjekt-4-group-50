import { Component, OnInit, Input } from '@angular/core';
import { Artist } from './artist';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ArtistService } from "./artist.service";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  constructor(public dialog: MatDialog, private artistService: ArtistService) {}
  artists: Artist[];
  selectedArtist: Artist;


  ngOnInit(): void {
    this.getArtists();
  }

  @Input() artist: Artist;



  getArtists(): void {
    this.artistService.getArtists().then(artists => this.artists = artists);
  }



  openDialog(artist: Artist): void{

    this.selectedArtist = artist;

    const dialogRef = this.dialog.open(DialogComponent, {
      height: '80%',
      width: '70%',
      data: this.artists,

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


