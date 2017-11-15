import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../data.service';
import { UserResponse } from '../../interfaces/user-response.interface';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MatDialog } from '@angular/material';
import { ArtistResponse } from '../../interfaces/artist-response.interface';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'favorite-artists',
  templateUrl: './favorite-artists.component.html',
  styleUrls: ['./favorite-artists.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FavoriteArtistsComponent implements OnInit {
    constructor(private searchService: DataService, private dialog: MatDialog) { }

    ngOnInit() {
        this.searchService.getUser().subscribe(data => {
            this.user = data;
            this.dataSource = new ArtistDataSource(this.user.favorite_artistsData);
        })
    }
    user: UserResponse;

    displayedColumns = ['image', 'name', 'popularity'];
    dataSource: ArtistDataSource;

    //Denne logger søkestrengen du trykker på i listen
    handleRowClick = (row) => {
        this.openDialog(row);
    }

    openDialog(artist: ArtistResponse) {
        this.searchService.getAlbumsByIds(artist.albums).subscribe(data => {
            const dialogRef = this.dialog.open(DialogComponent, {
                height: "80%",
                width: "70%",
                data: [artist, data],
            });
            dialogRef.afterClosed();
        });
    }

}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ArtistDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  constructor(data: ArtistResponse[]) {
      super();
      this.data = data;
  }

  data: ArtistResponse[];

  connect(): Observable<ArtistResponse[]> {
    return Observable.of(this.data);
  }

  disconnect() {}
}
