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
    styleUrls: ['../../../assets/styles/sharedStyles/search-result-element.css']
})
export class AlbumComponent implements OnInit {


    constructor(public dialog: MatDialog, private searchService: DataService) {
    }

    songs: SongResponse[]; //list with fetched songs
    artists: ArtistResponse[]; //list with fetched artists

    ngOnInit(): void {
    }

    //Current album
    @Input() album: AlbumResponse;

    // Get all songs by their ids, input is a list
    getSongs(songs): Observable<SongResponse[]> {
        return this.searchService.getSongsByIds(songs);
    }

    //Opens the song dialog on click of button
    openDialog() {
        this.artists = this.album.artistsData;
        this.searchService.updateSearchHistory('album', this.album._id).subscribe();

        // Gets all the songs that belongs to the current album
        this.getSongs(this.album.songs).subscribe(songs => {
            this.songs = songs;

            //Opens the song dialog with data that contains artists, album and the songs.
            const dialogRef = this.dialog.open(SongDialogComponent, {
                height: "80%",
                width: "70%",
                data: [this.artists, this.album, this.songs],
            });
            dialogRef.afterClosed();
        });
    }
}
