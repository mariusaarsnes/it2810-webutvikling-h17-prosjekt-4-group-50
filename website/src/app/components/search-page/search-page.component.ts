import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
	selector: 'app-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.css']

})
export class SearchPageComponent implements OnInit {

	@ViewChild('child') child;

	constructor() {
	}

	ngOnInit() {
	}

	@Input() filterList: string[];

	public updateSearch(): void {
		this.child.renderTreshold = 10;
		this.child.getArtistsByName();
	}

	onChangeSearch(): void {
		if (this.searchInput !== '') {
			this.updateSearch();
		} else {
			this.child.clearArtists();
		}
	}

	searchInput: string;

}
