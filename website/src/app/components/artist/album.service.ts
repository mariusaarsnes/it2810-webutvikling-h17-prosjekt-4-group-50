import { Injectable } from '@angular/core';
import { AlbumResponse } from "../../interfaces/album-response.interface";
import { HttpClient } from "@angular/common/http";
import {SongResponse} from "../../interfaces/song-response.interface";

@Injectable()
export class AlbumService {

	constructor(private http: HttpClient) { }

	getAlbums(albums): Promise<AlbumResponse[]> {
		return this.http.get<AlbumResponse[]>('api/albums/' +  albums).toPromise();
	}
    getSongs(songs): Promise<SongResponse[]> {
        return this.http.get<SongResponse[]>('api/songs/' +  songs).toPromise();
    }



}
