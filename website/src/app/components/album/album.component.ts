import {Component, Input, OnInit} from '@angular/core';
import {AlbumResponse} from "../../interfaces/album-response.interface";
import {SongResponse} from "../../interfaces/song-response.interface";
import {DataService} from "../../data.service";
import {MatDialog} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {ArtistResponse} from "../../interfaces/artist-response.interface";
import {DialogComponent} from "../dialog/dialog.component";


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
    showAlbum: boolean = false;

    ngOnInit(): void {
    }

    @Input() album: AlbumResponse;

    getSongs(songs): Observable<SongResponse[]> {
        return this.searchService.getSongsByIdsWithAlbums(songs);
    }
    getArtistsByIds(ids): Observable<ArtistResponse[]> {
        return this.searchService.getArtistsByIds(ids);
    }


    openDialog(dialog) {
        this.showAlbum = dialog === "albums";

        this.artists = this.album.artistsData;
        console.log(this.album);

        this.album.artistsData.forEach(artist => {
            console.log(artist.name);
        });

        this.getSongs(this.album.songs).subscribe(songs => {
            this.songs = songs;
            const dialogRef = this.dialog.open(DialogComponent, {
                height: "80%",
                width: "70%",
                data: [this.artists, this.album, this.songs, this.showAlbum],
            });
            dialogRef.afterClosed();
        });

    }
}
