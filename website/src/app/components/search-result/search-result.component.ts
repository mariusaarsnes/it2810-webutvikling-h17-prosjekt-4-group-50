import {Component, Input, OnInit, HostListener, Inject, OnChanges, SimpleChanges} from '@angular/core';
import {DataService} from "../../data.service";
import {HttpClient} from "@angular/common/http";
import {DOCUMENT, NgStyle} from "@angular/common";


@Component({
	selector: 'app-search-result',
	templateUrl: './search-result.component.html',
	styleUrls: ['./search-result.component.css']
})


export class SearchResultComponent implements OnInit, OnChanges {

	constructor(private searchService: DataService,
				private http: HttpClient,
				@Inject(DOCUMENT) private document: Document) {
	}
	artists = [];
	tracks = [];
	albums = [];

	index = 0;
	renderTreshold = 15;
	canRenderNew = true;
	divWidth = 0;
	placesPerRow = 0;
	placesLeftToFill = 0;
	searchResultWidth = 320;

	ngOnChanges(changes: SimpleChanges) {
		if (this.searchString && this.searchString !== "") {
            this.clearData();
            this.getData(this.index, this.renderTreshold);
		} else {
			this.getStandardData();
		}
	};
	getData(index: number, amount: number): void {

	    switch (this.searchType) {
            case "artist":
                this.searchService.getArtists(this.searchString, amount, index, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "none", this.sortType ? this.sortType : "ascending").subscribe(artists => {
                    this.artists = this.artists.concat(artists);
                    this.canRenderNew = true;
                });
                break;
            case "album":
                this.searchService.getAlbums(this.searchString, amount, index, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "none", this.sortType ? this.sortType : "ascending").subscribe( albums => {
                    this.albums = this.albums.concat(albums)
                    this.canRenderNew = true;
                })
                break;
            case "track":
                this.searchService.getSongs(this.searchString, amount, index, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "none", this.sortType ? this.sortType : "ascending").subscribe( tracks => {
                    this.tracks = this.tracks.concat(tracks);
                    this.canRenderNew = true;
                });
                break;
        }
	};
    getStandardData(): void {
	    switch (this.searchType) {
            case "artist":
                this.searchService.getArtists("*", this.renderTreshold, this.index, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "popularity", this.sortType ? this.sortType : "descending").subscribe(artists => {
                    this.artists = artists;
                });
            case "album":
                this.searchService.getAlbums("*", this.renderTreshold, this.index, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "none", this.sortType ? this.sortType : "descending").subscribe(albums => {
                    this.albums = albums;
                });
            case "track":
                this.searchService.getSongs("*", this.renderTreshold, this.index, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "none", this.sortType ? this.sortType : "descending").subscribe(tracks => {
                    this.tracks = tracks;
                });
        }
	};
    clearData(): void {
        this.index = 0;
        this.artists = [];
        this.albums = [];
        this.tracks = [];
    };
	ngOnInit() {
	    this.placesPerRow = Math.floor((window.innerWidth - 40) / this.searchResultWidth);
	    this.placesLeftToFill = (this.index + this.renderTreshold) % this.placesPerRow;
	    console.log(this.placesLeftToFill);
        this.divWidth = Math.floor((((window.innerWidth - 40) / this.searchResultWidth))) * this.searchResultWidth;
	};

	@Input() filterList = [];
	@Input() sort: string;
	@Input() sortType: string;
	@Input() searchType: string;
	@Input('search') searchString: string;



    @HostListener("window:resize", ['$event'])
    onResize(e) {
        this.divWidth = Math.floor(((e.target.innerWidth) / this.searchResultWidth)) * this.searchResultWidth;
    }
	@HostListener("window:scroll", [])
	onWindowScroll() {
		if (this.canRenderNew && this.searchString && this.searchString !== "") {
			let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 30) {
				//reached bottom
				this.canRenderNew = false;
				this.index += this.renderTreshold;
				this.getData(this.index, this.renderTreshold);
			}
		}
	}
}
