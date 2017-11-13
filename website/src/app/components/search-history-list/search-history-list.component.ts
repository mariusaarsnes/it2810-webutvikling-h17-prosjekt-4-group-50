import {Component} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/**
 * @title Basic table
 */
 @Component({
   selector: 'search-history-list',
   templateUrl: './search-history-list.component.html',
   styleUrls: ['./search-history-list.component.css']
 })

export class SearchHistoryListComponent {

    displayedColumns = ['search', 'date'];
    dataSource = new ExampleDataSource();

    //Denne logger søkestrengen du trykker på i listen
    handleRowClick = (row) => {
        console.log(row.search)
    }

}

export interface Element {
  search: string;
  date: string;
}

const data: Element[] = [
    {search: "Queen", date: "06-11-2017"},
    {search: "Johnny Ca$h", date: "06-11-2017"},
    {search: "Bohemian Rapsody", date: "06-11-2017"},
    {search: "Yellow", date: "06-11-2017"},
    {search: "Coldplay", date: "06-11-2017"},
    {search: "Fakking Degos Band", date: "06-11-2017"},
    {search: "Dj Hulings", date: "06-11-2017"},
    {search: "AC/DC", date: "06-11-2017"},
    {search: "Bohemian Rapsody", date: "06-11-2017"},
    {search: "Yellow", date: "06-11-2017"},
    {search: "Coldplay", date: "06-11-2017"},
    {search: "Fakking Degos Band", date: "06-11-2017"},
    {search: "Dj Hulings", date: "06-11-2017"},
    {search: "Bohemian Rapsody", date: "06-11-2017"},
    {search: "Yellow", date: "06-11-2017"},
    {search: "Coldplay", date: "06-11-2017"},
    {search: "Fakking Degos Band", date: "06-11-2017"},
    {search: "Dj Hulings", date: "06-11-2017"},
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
