import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ArtistResponse } from "../../interfaces/artist-response.interface";
import {SongResponse} from "../../interfaces/song-response.interface";
import {SongsDialogComponent} from "../songs-dialog/songs-dialog.component";
import {SearchService} from "../search-result/search.service";
import {Observable} from "rxjs/Observable";
import {AlbumResponse} from "../../interfaces/album-response.interface";

@Component({
	selector: 'app-artist',
	templateUrl: './artist.component.html',
	styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

    constructor(public dialog: MatDialog, private searchService: SearchService) {
    }

    albums: AlbumResponse[];
    songs: SongResponse[];

    ngOnInit(): void {
    }

    @Input() artist: ArtistResponse;


    getAlbums(albums): Observable<AlbumResponse[]> {
        return this.searchService.getAlbumsByIds(albums);
    }
    getSongs(songs): Observable<SongResponse[]> {
        return this.searchService.getSongsByIds(songs);
    }


    openDialogAlbums() {
        this.getSongs(this.artist.songs).subscribe(songs => {
            this.songs = songs;
            this.getAlbums(this.artist.albums).subscribe(albums => {
                this.albums = albums;

                const dialogRef = this.dialog.open(DialogComponent, {

                    height: "80%",
                    width: "70%",
                    data: [this.artist, this.albums, this.songs],
                });
                dialogRef.afterClosed();
            });
        });

    }
    openDialogTracks() {

        this.getSongs(this.artist.songs).subscribe(songs => {

            this.songs = songs;



            const dialogRef = this.dialog.open(SongsDialogComponent, {
                height: "80%",
                width: "70%",
                data: [this.artist],
            });
            dialogRef.afterClosed();
        });
    }
}
