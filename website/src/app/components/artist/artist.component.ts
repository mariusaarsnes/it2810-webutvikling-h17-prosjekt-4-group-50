<<<<<<< HEAD
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
		console.log(this.artist.albums.join(','));
		this.getAlbums(this.artist.albums.join(',')).then(albums => {
			console.log(albums);
			this.albums = albums;
			const w = window,
				d = document,
				e = d.documentElement,
				g = d.getElementsByTagName('body')[0],
				x = w.innerWidth || e.clientWidth || g.clientWidth;
			let height = "80%",
				width = "70%";

			const dialogRef = this.dialog.open(DialogComponent, {

				height: height,
				width: width,
				data: [this.artist, this.albums],
			});
			dialogRef.afterClosed();
		});


	}


=======
import {Component, Input, OnInit} from '@angular/core';

import {ArtistResponse} from '../../interfaces/artist-response.interface';
import {MatDialog} from '@angular/material';
import {DialogComponent} from './dialog.component';

@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

    constructor(public dialog: MatDialog) {
    }

    ngOnInit() {
    }

    @Input() artist: ArtistResponse;

    openDialog() {
        const dialogRef = this.dialog.open(DialogComponent, {
            height: '80%',
            width: '70%'

        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
>>>>>>> 3e4953e2d85ac9c19618df963fa20212cbd0d7db

}


