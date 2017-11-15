import {Injectable} from '@angular/core';
import {ArtistResponse} from "../../interfaces/artist-response.interface";
import {HttpClient} from "@angular/common/http";

import {SongResponse} from "../../interfaces/song-response.interface";
import {AlbumResponse} from "../../interfaces/album-response.interface";
import {Observable} from "rxjs/Observable";
import {GenresResponse} from "../../interfaces/genres-response.interface";
import {UserResponse} from "../../interfaces/user-response.interface";
import {SearchHistoryResponse} from "../../interfaces/history-response.interface";
import {SearchHistoryData} from "../../interfaces/search-history-data-response.interface";

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

    getArtist(id: string): Observable<ArtistResponse> {
        return this.http.get<ArtistResponse>('api/artist/' + id);
    }

    getSong(id: string): Observable<SongResponse> {
        return this.http.get<SongResponse>('api/song/' + id);
    }

    /**
     * Fetches a list of genres + counts of the favorite artists
     * @returns {Observable<GenresResponse[]>}
     */
    getFavoriteGenres(): Observable<GenresResponse[]> {
        return this.http.get<GenresResponse[]>('api/aggregate_genres');
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
            return Observable.forkJoin(observables);
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
            return Observable.forkJoin(observables);
        });
    }

    /**
     * Returns the user with its favorite artists
     * @returns {Observable<UserResponse>}
     */
    getUser(): Observable<UserResponse> {
        return this.http.get<UserResponse>('api/user').switchMap(result => {
            const artists = this.getArtistsByIds(result.favorite_artists);
            return Observable.of(result).combineLatest(artists, (res, artists) => {
                return <UserResponse>{...res, favorite_artistsData: artists};
            });
        });
    }

    getSearchHistory(): Observable<SearchHistoryResponse[]> {
        return this.http.get<SearchHistoryResponse[]>('api/search_history').switchMap(data => {
            let observables = [];
            data.forEach(val => {
                const schema = this.getSchemaById(val.type, val.type_id);
                observables.push(Observable.of(val).combineLatest(schema, (val, schema) => {
                    return <SearchHistoryResponse>{...val, typeData: schema};
                }));
            });
           return Observable.forkJoin(observables);
        });
    }

    getSearchHistoryData(): Observable<SearchHistoryData> {
        return this.http.get<SearchHistoryData>('api/search_history_data');
    }

    getSchemaById(type: string, id: string) {
        switch (type) {
            case "album":
                return this.getAlbum(id);
            case "song":
                return this.getSong(id);
            case "artist":
                return this.getArtist(id);
        }
        return null;
    }

    updateSearchHistory(type: string, id: string) {
        this.http.post('api/update_history', {type: type, type_id: id});
    }

}
