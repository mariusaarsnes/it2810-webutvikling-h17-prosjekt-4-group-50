import {Injectable} from '@angular/core';
import {ArtistResponse} from "../../interfaces/artist-response.interface";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';

import {TrackResponse} from "../../interfaces/track-response.interface";
import {AlbumResponse} from "../../interfaces/album-response.interface";

@Injectable()
export class SearchService {

	constructor(private http: HttpClient) {
	}

	getArtists(name: string, amount: number, index: number, filter: string, filterValue: string, sort: string, sortType: string): Promise<ArtistResponse[]> {
		return this.http.get<ArtistResponse[]>('api/artists/' + name + '/' + sort + '/' + sortType + '/' + filter + '/' + filterValue + '/' + index + '/' + amount).toPromise();
	}

	getAlbum(id: string): Promise<AlbumResponse[]> {
		return this.http.get<AlbumResponse[]>('api/albums' + id).toPromise();
	}

	getTracks(name: string, amount: number, index: number): Promise<TrackResponse[]> {
		return this.http.get<TrackResponse[]>('api/songs/' + name + "/" + index + "/" + amount).toPromise();
	}


}
