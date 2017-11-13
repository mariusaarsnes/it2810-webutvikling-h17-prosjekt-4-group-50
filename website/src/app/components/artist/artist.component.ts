import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { AlbumService } from "./album.service";
import { ArtistResponse } from "../../interfaces/artist-response.interface";
import { AlbumResponse } from "../../interfaces/album-response.interface";
import {SongResponse} from "../../interfaces/song-response.interface";
import {SongsDialogComponent} from "../songs-dialog/songs-dialog.component";

@Component({
	selector: 'app-artist',
	templateUrl: './artist.component.html',
	styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

    constructor(public dialog: MatDialog, private albumService: AlbumService) {
    }

    albums: AlbumResponse[];
    songs: SongResponse[];

    ngOnInit(): void {
    }

    @Input() artist: ArtistResponse;


    getAlbums(albums): Promise<AlbumResponse[]> {
        return this.albumService.getAlbums(albums);
    }
    getSongs(songs): Promise<SongResponse[]> {
        return this.albumService.getSongs(songs);
    }


    openDialogAlbums() {
        console.log(this.artist);
        this.getAlbums(this.artist.albums.join(',')).then(albums => {
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

        this.getSongs(this.artist.songs.join(',')).then(songs => {
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
