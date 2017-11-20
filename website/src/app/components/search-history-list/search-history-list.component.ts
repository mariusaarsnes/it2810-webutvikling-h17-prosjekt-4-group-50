import {Component, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {DataService} from '../../data.service';
import {SearchHistoryResponse} from '../../interfaces/history-response.interface';
import 'rxjs/add/observable/of';

/**
 * @title Basic table
 */
 @Component({
   selector: 'search-history-list',
   templateUrl: './search-history-list.component.html',
   styleUrls: ['./search-history-list.component.css']
 })

export class SearchHistoryListComponent implements OnInit {

    data: SearchHistoryResponse[];
    date: string;
    displayedColumns = ['type', 'name', 'date'];
    dataSource: SearchDataSource;

    constructor(private searchService: DataService) {

    }

    ngOnInit() {
        this.searchService.getSearchHistory().subscribe(data => {
            this.data = data;
            this.dataSource = new SearchDataSource(this.data);

        });
    }
}


/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class SearchDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  data: SearchHistoryResponse[];
  constructor(data: SearchHistoryResponse[]) {
    super();
    this.data = data;
  }

  connect(): Observable<SearchHistoryResponse[]> {
    return Observable.of(this.data);
  }

  disconnect() {}
}
