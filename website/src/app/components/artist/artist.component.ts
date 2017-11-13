import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ArtistResponse } from "../../interfaces/artist-response.interface";
import { AlbumResponse } from "../../interfaces/album-response.interface";
import {SongResponse} from "../../interfaces/song-response.interface";
import {SongsDialogComponent} from "../songs-dialog/songs-dialog.component";
import {SearchService} from "../search-result/search.service";
import {Observable} from "rxjs/Observable";

@Component({
	selector: 'app-artist',
	templateUrl: './artist.component.html',
	styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

    constructor(public dialog: MatDialog, private albumService: SearchService) {
    }

    albums: AlbumResponse[];
    songs: SongResponse[];

    ngOnInit(): void {
    }

    @Input() artist: ArtistResponse;


    getAlbums(albums): Observable<AlbumResponse[]> {
        return this.albumService.getAlbumsByIds(albums);
    }
    getSongs(songs): Observable<SongResponse[]> {
        return this.albumService.getSongsByIdsWithAlbums(songs);
    }


    openDialogAlbums() {
        console.log(this.artist);
        this.getAlbums(this.artist.albums).subscribe(albums => {
            this.albums = albums;

            const dialogRef = this.dialog.open(DialogComponent, {

                height: "80%",
                width: "70%",
                data: [this.artist, this.albums],
            });
            dialogRef.afterClosed();
        });
    }
    openDialogTracks() {

        this.getSongs(this.artist.songs).subscribe(songs => {
            this.songs = songs;
            console.log(this.songs);

            const dialogRef = this.dialog.open(SongsDialogComponent, {

                height: "80%",
                width: "70%",
                data: [this.artist, this.songs],
            });
            dialogRef.afterClosed();
        });
    }
}
