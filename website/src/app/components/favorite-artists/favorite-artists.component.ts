import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'favorite-artists',
  templateUrl: './favorite-artists.component.html',
  styleUrls: ['./favorite-artists.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FavoriteArtistsComponent implements OnInit {

    displayedColumns = ['type', 'name', 'date'];
    dataSource = new ExampleDataSource();

    //Denne logger søkestrengen du trykker på i listen
    handleRowClick = (row) => {
        console.log(row.name, row.type, row.date)
    }


  constructor() { }

  ngOnInit() {
  }
}

export interface Element {
    type: string;
    name: string;
    date: string;
}

const data: Element[] = [
    {type: "album", name: "Dave's Picks, Volume 24: Berkeley Community Theatre, Berkeley, CA, 8/25/72", date: "06-11-2017"},
    {type: "artist", name: "Queen", date: "06-11-2017"},
    {type: "artist", name: "Queen", date: "06-11-2017"},
    {type: "artist", name: "Queen", date: "06-11-2017"},
    {type: "artist", name: "Queen", date: "06-11-2017"},
    {type: "artist", name: "Queen", date: "06-11-2017"},
    {type: "artist", name: "Queen", date: "06-11-2017"},
    {type: "artist", name: "Queen", date: "06-11-2017"},
    {type: "artist", name: "Queen", date: "06-11-2017"},
];

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(data);
  }

  disconnect() {}
}
