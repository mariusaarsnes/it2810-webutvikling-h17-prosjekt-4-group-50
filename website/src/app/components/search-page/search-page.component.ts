import {Component, OnInit, ViewChild} from '@angular/core';
import { SearchResultComponent } from "../search-result/search-result.component";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']

})
export class SearchPageComponent implements OnInit {

	@ViewChild('child') child;
  constructor() { }

  ngOnInit() {
  }
  onChangeSearch(): void {
  	this.child.renderTreshold = 15;
  	if(this.searchInput !== '') {
		this.child.getArtistsByName();
	}
  }
  searchInput: string;

}
