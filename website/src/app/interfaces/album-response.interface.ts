import {ArtistResponse} from "./artist-response.interface";
import {SongResponse} from "./song-response.interface";

export interface AlbumResponse {
	_id: string;
	name: string;
	imageLink: string;
	tracks: string[];
	songsData: SongResponse[];
	artists: string[];
	artistsData: ArtistResponse[];
}
