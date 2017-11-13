import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { AlbumService } from "./album.service";
import { ArtistResponse } from "../../interfaces/artist-response.interface";
import { AlbumResponse } from "../../interfaces/album-response.interface";

@Component({
	selector: 'app-artist',
	templateUrl: './artist.component.html',
	styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

    constructor(public dialog: MatDialog, private albumService: AlbumService) {
    }

    albums: AlbumResponse[];

    ngOnInit(): void {
    }

    @Input() artist: ArtistResponse;


    getAlbums(albums): Promise<AlbumResponse[]> {
        return this.albumService.getAlbums(albums);
    }

    openDialog() {
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
}
