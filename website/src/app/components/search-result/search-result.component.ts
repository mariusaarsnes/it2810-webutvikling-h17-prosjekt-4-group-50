import {Component, Input, OnInit} from '@angular/core';
import { SearchService } from "./search.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  artists: string[];
  getArtists(): void {
    this.searchService.getArtists().then(artists => this.artists = artists);
  };
  ngOnInit() {
    this.getArtists();
  }

  @Input('search') searchString: string;

}
