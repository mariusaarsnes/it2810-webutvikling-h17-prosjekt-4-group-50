import { Component, OnInit, Input } from '@angular/core';
import { ArtistResponse } from "../../interfaces/artist-response.interface";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() artist: ArtistResponse;

}
