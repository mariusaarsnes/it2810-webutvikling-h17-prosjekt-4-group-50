import {Component, Input, OnInit} from '@angular/core';
import {AlbumResponse} from "../../interfaces/album-response.interface";
import {SongResponse} from "../../interfaces/song-response.interface";
import {DataService} from "../../data.service";
import {MatDialog} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {SongDialogComponent} from "../song-dialog/song-dialog.component";
import {ArtistResponse} from "../../interfaces/artist-response.interface";


@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {


    constructor(public dialog: MatDialog, private searchService: DataService) {
    }

    songs: SongResponse[];
    artists: ArtistResponse[];

    ngOnInit(): void {
    }

    @Input() album: AlbumResponse;

    getSongs(songs): Observable<SongResponse[]> {
        return this.searchService.getSongsByIds(songs);
    }

    openDialog() {

        this.artists = this.album.artistsData;
        console.log(this.album);
        this.getSongs(this.album.songs).subscribe(songs => {
            this.songs = songs;
            const dialogRef = this.dialog.open(SongDialogComponent, {
                height: "80%",
                width: "70%",
                data: [this.artists, this.album, this.songs],
            });
            dialogRef.afterClosed();
        });
    }
}
