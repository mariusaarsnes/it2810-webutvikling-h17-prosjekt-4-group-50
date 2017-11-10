<<<<<<< HEAD
=======
import {ArtistResponse} from "./artist-response.interface";
import {SongResponse} from "./song-response.interface";

>>>>>>> 3e4953e2d85ac9c19618df963fa20212cbd0d7db
export interface AlbumResponse {
	_id: string;
	name: string;
	imageLink: string;
<<<<<<< HEAD
	__v: number;
	tracks: string[];
	artists: string[];
=======
	songs: string[];
	songsData: SongResponse[];
	artists: string[];
	artistsData: ArtistResponse[];
>>>>>>> 3e4953e2d85ac9c19618df963fa20212cbd0d7db
}
