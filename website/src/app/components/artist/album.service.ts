import { Injectable } from '@angular/core';
import { AlbumResponse } from "../../interfaces/album-response.interface";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AlbumService {

	constructor(private http: HttpClient) { }

	getAlbums(albums): Promise<AlbumResponse[]> {
		console.log('api/albums/' + albums);
		return this.http.get<AlbumResponse[]>('api/albums/' +  albums).toPromise();
	}

}
