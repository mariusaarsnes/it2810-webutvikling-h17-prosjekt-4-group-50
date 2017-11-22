import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ArtistResponse } from "../../interfaces/artist-response.interface";
import {AlbumResponse} from "../../interfaces/album-response.interface";
import {DataService} from "../../data.service";
import {Observable} from "rxjs/Observable";


@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['../../../assets/styles/sharedStyles/search-result-element.css']
})
export class ArtistComponent implements OnInit {

    constructor(public dialog: MatDialog, private searchService: DataService) {
    }

    albums: AlbumResponse[]; //albums for the artist
    isFavorite: boolean; //variable for checking if artist is favorite or not

    ngOnInit(): void {
        //fetch if an artist is favorite or not
        this.searchService.isFavorite(this.artist._id).subscribe(isFavorite => {
            this.isFavorite = isFavorite;
        });
    }

    // Current artist
    @Input() artist: ArtistResponse;

    // Get all albums by their ids, input is a list
    getAlbums(albums): Observable<AlbumResponse[]> {
        return this.searchService.getAlbumsByIds(albums);
    }

    //Opens the dialog on click of button
    openDialog() {

        //Gets all albums by the albums ids in the artist.
        this.getAlbums(this.artist.albums).subscribe(albums => {
            this.albums = albums;
            this.searchService.updateSearchHistory('artist', this.artist._id).subscribe();

            // Code for opening the material ui dialog, sends data that contains
            // artist and the albums
            const dialogRef = this.dialog.open(DialogComponent, {
                height: "80%",
                width: "70%",
                data: [this.artist, this.albums],
            });
            // Close the dialog.
            dialogRef.afterClosed();
        });

    }
    //function for toggeling wheter an artist is favorite or not
    favorite() {

        if (this.isFavorite)
            this.searchService.removeFavoriteArtist(this.artist._id).subscribe(); //remove artist from favorite in db
        else
            this.searchService.addFavoriteArtist(this.artist._id).subscribe(); //add artist to favorite in db
        this.isFavorite = !this.isFavorite; //toggle favorite bool
    }

}
