import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-navbar-search',
	templateUrl: './navbar-search.component.html',
	styleUrls: ['./navbar-search.component.css'],
})
export class NavbarSearchComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

	filterlist  = [];
	sort        = "none";
	sortType    = "ascending";
	searchType  = "album";

	selectSort(e): void {
		this.sort = e.target.value;
	}
    selectSortType(e): void {
	    this.sortType = e.target.value;
    }
	selectFilter(e): void {
		const index = this.filterlist.findIndex(array => array[1] == e.target.name);
		if (index > -1) {
			this.filterlist.splice(index, 1);
		} else {
			this.filterlist.push([e.target.dataset["type"], e.target.name]);
		}
		this.filterlist = this.filterlist.slice();
	};
	setSearchType(e): void {
	    this.searchType = e.target.dataset["type"];
    };

}
