import { Component, Input, OnInit, HostListener, Inject } from '@angular/core';
import { SearchService } from "./search.service";
import { HttpClient } from "@angular/common/http";
import { ArtistResponse } from "../../interfaces/artist-response.interface";
import { DOCUMENT } from "@angular/common";


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})


export class SearchResultComponent implements OnInit {

  constructor(
  	private searchService: SearchService,
	private http: HttpClient,
	@Inject(DOCUMENT) private document: Document
  ) { }

  artists: ArtistResponse[];

  index = 0;
  public renderTreshold = 15;
  canRenderNew = true;

  public getArtistsByName(): void {
  	this.searchService.getArtists(this.searchString, this.renderTreshold, this.index, "none", "none", "name", "ascending").then(artists => {
		this.artists = artists;
		this.canRenderNew = true;
	});
  }
  ngOnInit() {
  }
  @Input('search') searchString: string;

	@HostListener("window:scroll", [])
	onWindowScroll() {
		console.log("??");
		if(this.canRenderNew) {
			let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
			if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				//reached bottom
				this.canRenderNew = false;
				this.renderTreshold += 10;
				this.getArtistsByName();
			}
		}
	}
}
