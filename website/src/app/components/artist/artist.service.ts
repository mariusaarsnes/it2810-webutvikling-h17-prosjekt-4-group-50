import {Injectable} from '@angular/core';
import {Artist} from "./artist";
import {ARTISTS} from "./mock-artists";
import { Album } from "./album";
import { ALBUMS } from "./mock-albums";


@Injectable()
export class ArtistService {
	getArtists(): Promise<Artist[]> {
		return Promise.resolve(ARTISTS);
	}
	getAlbums(): Promise<Album[]> {
		return Promise.resolve(ALBUMS);
	}
}
