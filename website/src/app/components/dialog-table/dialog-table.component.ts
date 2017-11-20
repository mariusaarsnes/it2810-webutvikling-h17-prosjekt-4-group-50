import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {AlbumResponse} from "../../interfaces/album-response.interface";
import {SongResponse} from "../../interfaces/song-response.interface";
import {DataService} from "../../data.service";

@Component({
    selector: 'dialog-table',
    templateUrl: './dialog-table.component.html',
    styleUrls: ['./dialog-table.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogTableComponent implements OnChanges {


    displayedColumns = ['name', 'duration'];
    dataSource : DialogDataSource;
    songs: SongResponse[];

    constructor(private searchService : DataService) {}
    ngOnChanges() {
        this.searchService.getSongsByIds(this.album.songs).subscribe(songs => {
            this.songs = songs;
            this.dataSource = new DialogDataSource(this.songs);
            console.log(this.songs);
        });
    }
    @Input() album: AlbumResponse;


}
/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class DialogDataSource extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */

    constructor(data: SongResponse[]) {
        super();
        this.data = data;
    }
    data: SongResponse[];

    connect(): Observable<SongResponse[]> {
        return Observable.of(this.data);
    }
    disconnect() {
    }
}
