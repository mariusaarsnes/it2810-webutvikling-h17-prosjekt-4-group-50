import {Injectable} from '@angular/core';
import {ArtistResponse} from "../../interfaces/artist-response.interface";
import {HttpClient} from "@angular/common/http";

import {SongResponse} from "../../interfaces/song-response.interface";
import {AlbumResponse} from "../../interfaces/album-response.interface";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SearchService {

    constructor(private http: HttpClient) {

    }

    /**
     * Fetches artists with names containing 'name'. Limits the result size to 'amount'. Filters the results on the
     * attribute corresponding to 'filter' on the value 'filterValue' (Can have multiple filters).
     * Sorts the list based on the attribute correspodning to 'sort'
     * @param {string} name
     * @param {number} amount
     * @param {number} index
     * @param {string} filter
     * @param {string} filterValue
     * @param {string} sort
     * @param {string} sortType
     * @returns {Observable<ArtistResponse[]>}
     */
    getArtists(name: string, amount: number, index: number, filter: string, filterValue: string, sort: string, sortType: string): Observable<ArtistResponse[]> {
        return this.http.get<ArtistResponse[]>('api/artists/' + name + '/' + sort + '/' + sortType + '/' + filter + '/' + filterValue + '/' + index + '/' + amount);
    }

    /**
     * Fetches artists with the given ids.
     * @param {string[]} ids
     * @returns {Observable<ArtistResponse[]>}
     */
    getArtistsByIds(ids: string[]): Observable<ArtistResponse[]> {
        return this.http.get<ArtistResponse[]>('api/artists/' + ids.join(","));
    }

    /**
     * Fetches an album given by the id and links it with its corresponding artists
     * @param {string} id
     * @returns {Observable<AlbumResponse>}
     */
    getAlbum(id: string): Observable<AlbumResponse> {
        return this.http.get<AlbumResponse>('api/album/' + id).switchMap(res => {
            let observable = this.getArtistsByIds(res.artists);
            return Observable.of(res).combineLatest(observable, (res, artists) => {
                return <AlbumResponse>{...res, artistsData: artists};
            });
        });
    }

    /**
     * Fetches all tracks containing the given name and links them with their corresponding album.
     * @param {string} name
     * @param {number} amount
     * @param {number} index
     * @returns {Observable<SongResponse[]>}
     */
    getSongs(name: string, amount: number, index: number): Observable<SongResponse[]> {
        return this.http.get<SongResponse[]>('api/songs/' + name + "/" + index + "/" + amount).switchMap(result => {
            let observables = [];
            result.forEach((res) => {
                const album = this.getAlbum(res.album);
                observables.push(Observable.of(res).combineLatest(album, (res, album) => {
                    return <SongResponse>{...res, albumData: album};
                }));
            });
            return observables;
        });
    }

    /**
     * Fetches songs with the given ids
     * @param {string[]} ids
     * @returns {Observable<SongResponse[]>}
     */
    getSongsByIds(ids: string[]): Observable<SongResponse[]> {
        return this.http.get<SongResponse[]>('api/songs/' + ids.join(","));
    }

    /**
     * Fetches all albums that contains the name.
     * @param {string} name
     * @param {number} amount
     * @param {number} index
     * @returns {Observable<AlbumResponse[]>}
     */
    getAlbums(name: string, amount: number, index: number): Observable<AlbumResponse[]> {
        return this.http.get<AlbumResponse[]>('api/albums/' + name + "/" + index + "/" + amount).switchMap(result => {
            let observables = [];
            result.forEach((res) => {
                const artists = this.getArtistsByIds(res.artists);
                const songs = this.getSongsByIds(res.songs);
                const both = artists.combineLatest(songs, (artists, songs) => {
                    return {artists: artists, songs: songs};
                });
                observables.push(Observable.of(res).combineLatest(both, (res, both) => {
                    return <AlbumResponse>{...res, artistsData: both.artists, songsData: both.songs};
                }));
            });
            return observables;
        });
    }

}
