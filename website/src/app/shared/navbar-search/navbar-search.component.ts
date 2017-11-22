import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-navbar-search',
    templateUrl: './navbar-search.component.html',
    styleUrls: ['./navbar-search.component.css'],
})
export class NavbarSearchComponent implements OnInit {

    constructor() {
    }

    filterlist = [];
    sort = 'popularity';
    sortType = 'descending';
    searchType = 'artist';

    ngOnInit() {
    }
    //function for selecting sort variable
    selectSort(e): void {
        this.sort = e.target.value;
    }
    //function for selecting sort type
    selectSortType(e): void {
        this.sortType = e.target.value;
    }
    //function for selecting filters
    selectFilter(e): void {
        //create an 2d array with filtertype and filter value
        const index = this.filterlist.findIndex(array => array[1] == e.target.name);
        if (index > -1) {
            this.filterlist.splice(index, 1);
        } else {
            this.filterlist.push([e.target.dataset['type'], e.target.name]);
        }
        this.filterlist = this.filterlist.slice();
    };
    //function for selecting search type
    setSearchType(e): void {
        this.searchType = e.target.dataset['type'];
    };

}
