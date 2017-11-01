import { Component, OnInit } from '@angular/core';
import { Artist } from "../artist/artist";
import { SearchService } from "./search.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  artists: Artist[];
  getArtists(): void {
    this.searchService.getArtists().then(artists => this.artists = artists);
  };
  ngOnInit() {
    this.getArtists();
  }


}
