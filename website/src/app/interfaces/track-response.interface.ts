
import {AlbumResponse} from "./album-response.interface";

export interface TrackResponse {
	_id: string;
	name: string;
	album: string;
	albumData: AlbumResponse;
	artists: string[];
}
