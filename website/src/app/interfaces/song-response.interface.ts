import {AlbumResponse} from './album-response.interface';

export interface SongResponse {
    _id: string;
    name: string;
    album: string;
    albumData: AlbumResponse;
    artists: string[];
}
