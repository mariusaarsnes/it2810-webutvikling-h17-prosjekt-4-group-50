import {Injectable} from '@angular/core';
import {ArtistResponse} from "../../interfaces/artist-response.interface";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';

import {TrackResponse} from "../../interfaces/track-response.interface";
import {AlbumResponse} from "../../interfaces/album-response.interface";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SearchService {

	constructor(private http: HttpClient) {
	}

	getArtists(name: string, amount: number, index: number, filter: string, filterValue: string, sort: string, sortType: string): Promise<ArtistResponse[]> {
		return this.http.get<ArtistResponse[]>('api/artists/' + name + '/' + sort + '/' + sortType + '/' + filter + '/' + filterValue + '/' + index + '/' + amount).toPromise();
	}

	getAlbum(id: string): Observable<AlbumResponse> {
		return this.http.get<AlbumResponse>('api/album/' + id);
	}

	/**
	 * Fetches all tracks containing the given name and fetches their corresponding album.
	 * @param {string} name
	 * @param {number} amount
	 * @param {number} index
	 * @returns {Observable<TrackResponse[]>}
	 */
	getTracks(name: string, amount: number, index: number): Observable<TrackResponse[]> {
		return this.http.get<TrackResponse[]>('api/songs/' + name + "/" + index + "/" + amount).switchMap(result => {
			let observables = [];
			result.forEach((res) => {
				const obs = this.getAlbum(res.album);
				observables.push(Observable.of(res).combineLatest(obs, (res, album) => {
					return <TrackResponse>{...res, albumData: album};
				}));
			});
			return observables;
		});
	}

}
