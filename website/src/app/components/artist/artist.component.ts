import { Component, OnInit, Input } from '@angular/core';
import { Artist } from "./artist";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() artist: Artist;

}
