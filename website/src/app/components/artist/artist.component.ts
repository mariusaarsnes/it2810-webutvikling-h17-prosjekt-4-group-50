import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { AlbumService } from "./album.service";
import { Album } from "./album";
import { ArtistResponse } from "../../interfaces/artist-response.interface";

@Component({
	selector: 'app-artist',
	templateUrl: './artist.component.html',
	styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

	constructor(public dialog: MatDialog, private albumService: AlbumService) {
	}

	albums: Album[];

	ngOnInit(): void {
		this.getAlbums()
	}

	@Input() artist: ArtistResponse;

	getAlbums(): void {
		this.albumService.getAlbums().then(albums => this.albums = albums);
	}

	openDialog(artist) {
		const dialogRef = this.dialog.open(DialogComponent, {
			height: '80%',
			width: '70%',
			data: [artist],

		});
		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: closed`);
		});
	}



}


