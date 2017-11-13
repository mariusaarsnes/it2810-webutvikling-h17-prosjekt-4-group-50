import {Component, Input, OnInit, HostListener, Inject, OnChanges} from '@angular/core';
import {SearchService} from "./search.service";
import {HttpClient} from "@angular/common/http";
import {ArtistResponse} from "../../interfaces/artist-response.interface";
import {DOCUMENT} from "@angular/common";


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


	index = 0;
	public renderTreshold = 15;
	canRenderNew = true;

	ngOnChanges(changes: any) {
		if (this.searchString && this.searchString !== "") {
			this.renderTreshold = 15;
			this.getArtistsByName();
		} else {
			this.clearArtists();
		}
	}

	public getArtistsByName(): void {
		this.searchService.getArtists(this.searchString, this.renderTreshold, this.index, this.filterList.length > 0 ? this.filterList.map(array => array[0]).join(",") : "none", this.filterList.length > 0 ? this.filterList.map(array => array[1]).join(",") : "none", this.sort ? this.sort : "none", this.sortType ? this.sortType : "ascending").subscribe(artists => {
			this.artists = artists;
			this.canRenderNew = true;
		});
	}

	public clearArtists(): void {
		this.artists = [];
	}

	ngOnInit() {

	}

	@Input() filterList = [];
	@Input() sort: string;
	@Input() sortType: string;
	@Input('search') searchString: string;


	@HostListener("window:scroll", [])
	onWindowScroll() {
		if (this.canRenderNew) {
			let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				//reached bottom
				this.canRenderNew = false;
				this.renderTreshold += 10;
				this.getArtistsByName();
			}
		}
	}
}
