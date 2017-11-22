import {Component, Input, HostListener, Inject, OnChanges, SimpleChanges} from '@angular/core';
import {DataService} from "../../data.service";
import {HttpClient} from "@angular/common/http";
import {DOCUMENT, NgStyle} from "@angular/common";


@Component({
	selector: 'app-search-result',
	templateUrl: './search-result.component.html',
	styleUrls: ['./search-result.component.css']
})


export class SearchResultComponent implements OnChanges {

    //constructor for initing services
	constructor(private searchService: DataService,
				private http: HttpClient,
				@Inject(DOCUMENT) private document: Document) {
	}
	//lists containing artists tracks and albums
	artists = [];
	tracks = [];
	albums = [];

	//variables used for dynamic loading
	index = 0;
	renderTreshold = 15;
	canRenderNew = true;

	//variables used to do calculations to center search results
	placesPerRow = 0;
	placesLeftToFill = 0;
	searchResultWidth = 320;
	resultCount = 0;
	widthOfAfterContent = 0;

	//function for updating search results whenever changes are made to the input variables
	ngOnChanges(changes: SimpleChanges) {
		if (this.searchString && this.searchString !== "") { //if the search string has content
            this.clearData(); //clear all data
            this.getData(this.index, this.renderTreshold); //fetch data, based on index and treshold
		} else {
			this.getStandardData(); //get standard data if the searchstring has no content
		}
	};
	//function for fetching data when search string has content
	getData(index: number, amount: number): void {
	    //use switch to know wether to fetch data for artists, albums or tracks
	    switch (this.searchType) {
            case "artist":
                //fetch artists
                this.searchService.getArtists(this.searchString, amount, index, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "none", this.sortType ? this.sortType : "ascending").subscribe(artists => {
                    this.artists = this.artists.concat(artists);
                    this.calculateRestToFillRow(artists.length);
                    this.canRenderNew = true;
                });
                break;
            case "album":
                //fetch albums
                this.searchService.getAlbums(this.searchString, amount, index, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "none", this.sortType ? this.sortType : "ascending").subscribe( albums => {
                    this.albums = this.albums.concat(albums)
                    this.calculateRestToFillRow(albums.length);
                    this.canRenderNew = true;
                });
                break;
            case "track":
                //fetch tracks
                this.searchService.getSongs(this.searchString, amount, index, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "none", this.sortType ? this.sortType : "ascending").subscribe( tracks => {
                    this.tracks = this.tracks.concat(tracks);
                    this.calculateRestToFillRow(tracks.length);
                    this.canRenderNew = true;
                });
                break;
        }
	};
	//function for fetching standard data, whenever there is no content in the searchstring
    getStandardData(): void {
        //use switch to know wether to fetch data for artists, albums or tracks.
	    switch (this.searchType) {
            case "artist":
                //fetch artists
                this.searchService.getArtists("*", this.renderTreshold, 0, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "popularity", this.sortType ? this.sortType : "descending").subscribe(artists => {
                    this.artists = artists;
                    this.calculateRestToFillRow(artists.length);
                });
                break;
            case "album":
                //fetch albums
                this.searchService.getAlbums("*", this.renderTreshold, 0, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "none", this.sortType ? this.sortType : "descending").subscribe(albums => {
                    this.albums = albums;
                    this.calculateRestToFillRow(albums.length);
                });
                break;
            case "track":
                //fetch tracks
                this.searchService.getSongs("*", this.renderTreshold, 0, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "none", this.sortType ? this.sortType : "descending").subscribe(tracks => {
                    this.tracks = tracks;
                    this.calculateRestToFillRow(tracks.length);
                });
                break;
        }
	};
    //function for clearing data
    clearData(): void {
        this.index = 0; //reset index
        this.resultCount = 0; //reset resultCount
        this.artists = []; //reset artist list
        this.albums = []; //reset album list
        this.tracks = []; //reset track list
    };
    //function to calculate how many spots required to fill the last row of the search results
    calculateRestToFillRow(amountOfResults: number): void {
        this.resultCount += amountOfResults; //increment searchresults
        this.placesPerRow = Math.floor((window.innerWidth - 40) / this.searchResultWidth); //find how many results fit in a row
        this.placesLeftToFill = this.placesPerRow - ((this.resultCount) % this.placesPerRow); //find how many places left to fill
        this.widthOfAfterContent = this.placesLeftToFill * this.searchResultWidth; //find the width needed to fill out the rest of the places
    };

    //input variables concerning searching, filtering and sorting.
	@Input() filterList = [];
	@Input() sort: string;
	@Input() sortType: string;
	@Input() searchType: string;
	@Input('search') searchString: string;

	//listener making sure the site stays responsive and that the placesLeftToFill variable is updated when page is resized.
    @HostListener("window:resize", ['$event'])
    onResize(e) {
        this.calculateRestToFillRow(0);
    }
    //listener to make sure that the content is dynamically loaded whenever the page is scrolled to the bottom.
	@HostListener("window:scroll", [])
	onWindowScroll() {
		if (this.canRenderNew && this.searchString && this.searchString !== "") { //if there is content in the search string and one can render new content
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 30) { //if the page is scrolled to the bottom
				this.canRenderNew = false; //make sure that the can render new items is disabled until all new items is rendered
				this.index += this.renderTreshold; //increment the index so that the query will fetch the right items
				this.getData(this.index, this.renderTreshold); //fetch correct data
			}
		}
	}
}
