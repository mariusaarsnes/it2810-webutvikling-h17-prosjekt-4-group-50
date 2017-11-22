import {AlbumResponse} from './album-response.interface';

export interface SongResponse {
    _id: string;
    name: string;
    album: string;
    duration: number[];
    albumData: AlbumResponse;
    artists: string[];
}
