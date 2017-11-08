import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
	selector: 'app-navbar-search',
	templateUrl: './navbar-search.component.html',
	styleUrls: ['./navbar-search.component.css'],
})
export class NavbarSearchComponent implements OnInit {

	@ViewChild('child') child;
	constructor() {
	}

	ngOnInit() {

	}

	filterlist = [];

	selectFilter(e): void {
		const index = this.filterlist.findIndex(array => array[1] == e.target.name);
		if (index > -1) {
			this.filterlist.splice(index, 1);
		} else {
			this.filterlist.push([e.target.dataset["type"], e.target.name]);
		}
		this.child.updateSearch();
	};

}
