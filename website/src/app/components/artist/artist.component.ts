import { Component, Input, OnInit } from '@angular/core';
import { Artist } from './artist';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ArtistService } from "./artist.service";
import { Album } from "./album";

@Component({
	selector: 'app-artist',
	templateUrl: './artist.component.html',
	styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

	constructor(public dialog: MatDialog, private artistService: ArtistService) {
	}

	artists: Artist[];
	albums: Album[];
	selectedArtist: Artist;


	ngOnInit(): void {
		this.getArtists();
		this.getAlbums()
	}

	@Input() artist: Artist;

	getArtists(): void {
		this.artistService.getArtists().then(artists => this.artists = artists);
	}
	getAlbums(): void {
		this.artistService.getAlbums().then(albums => this.albums = albums);
	}

	openDialog(id) {
		this.artists.forEach((artist) => {
			if (artist.id === id) {
				this.selectedArtist = artist;
			}
		});
		let albums = [];
		this.selectedArtist.albums.forEach((id) => {
			this.albums.forEach((album) => {
				if(album.id == id) {
					albums.push(album);
				}
			})
		});
		console.log(albums);
		const dialogRef = this.dialog.open(DialogComponent, {
			height: '80%',
			width: '70%',
			data: [this.selectedArtist, albums],

		});
		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: closed`);
		});
	}

}


