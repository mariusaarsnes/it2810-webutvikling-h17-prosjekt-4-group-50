import {Component, Input, OnInit, HostListener, Inject, OnChanges} from '@angular/core';
import {SearchService} from "./search.service";
import {HttpClient} from "@angular/common/http";
import {ArtistResponse} from "../../interfaces/artist-response.interface";
import {DOCUMENT} from "@angular/common";
import {SongResponse} from "../../interfaces/song-response.interface";
import {AlbumResponse} from "../../interfaces/album-response.interface";


@Component({
	selector: 'app-search-result',
	templateUrl: './search-result.component.html',
	styleUrls: ['./search-result.component.css']
})


export class SearchResultComponent implements OnInit, OnChanges {

	constructor(private searchService: SearchService,
				private http: HttpClient,
				@Inject(DOCUMENT) private document: Document) {
	}
	artists: ArtistResponse[];
	tracks: SongResponse[];
	albums: AlbumResponse[];

	index = 0;
	renderTreshold = 15;
	canRenderNew = true;
    prevSearchType = 'artist';

	ngOnChanges(changes: any) {
		if (this.searchString && this.searchString !== "") {
			this.renderTreshold = 15;
			this.getData();
		} else {
			this.getStandardData();
		}
	};
	getData(): void {

	    switch (this.searchType) {
            case "artist":
                this.searchService.getArtists(this.searchString, this.renderTreshold, this.index, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "none", this.sortType ? this.sortType : "ascending").subscribe(artists => {
                    this.artists = artists;
                    this.canRenderNew = true;
                });
                break;
            case "album":
                this.searchService.getAlbums(this.searchString, this.renderTreshold, this.index).subscribe( albums => {
                    this.albums = albums;
                    this.canRenderNew = true;
                })
                break;
            case "track":
                this.searchService.getSongs(this.searchString, this.renderTreshold, this.index).subscribe( tracks => {
                    this.tracks = tracks;
                    this.canRenderNew = true;
                });
                break;
        }
	};
    getStandardData(): void {
	    switch (this.searchType) {
            case "artist":
                this.searchService.getArtists("*", 15, 0, "none", "none", "popularity", "descending").subscribe(artists => {
                    this.artists = artists;
                });
            case "album":
                this.searchService.getAlbums("*", 15, 0).subscribe(albums => {
                    this.albums = albums;
                });
            case "track":
                this.searchService.getSongs("*", 15, 0).subscribe(tracks => {
                    this.tracks = tracks;
                });
        }
	};
	ngOnInit() {

	};

	@Input() filterList = [];
	@Input() sort: string;
	@Input() sortType: string;
	@Input() searchType: string;
	@Input('search') searchString: string;



	@HostListener("window:scroll", [])
	onWindowScroll() {
		if (this.canRenderNew && this.searchString && this.searchString !== "") {
			let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				//reached bottom
				this.canRenderNew = false;
				this.renderTreshold += 10;
				this.getData();
			}
		}
	}
}
