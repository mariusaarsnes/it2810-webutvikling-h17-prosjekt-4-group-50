import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";

@Component({
    selector: 'dialog-table',
    templateUrl: './dialog-table.component.html',
    styleUrls: ['./dialog-table.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogTableComponent implements OnInit {


    displayedColumns = ['title', 'duration'];
    dataSource = new ExampleDataSource();
    constructor() { }
    ngOnInit() {
    }
}
export interface Element {
    title: string;
    duration: string;
}
const data: Element[] = [
    {title: "Dave's Picks, Volume 24: Berkeley", duration: "06-11-2017"},
    {title: "Queen", duration: "06-11-2017"},
    {title: "Queen", duration: "06-11-2017"},
    {title: "Queen", duration: "06-11-2017"},
    {title: "Queen", duration: "06-11-2017"},
    {title: "Queen", duration: "06-11-2017"},
    {title: "Queen", duration: "06-11-2017"},
    {title: "Queen", duration: "06-11-2017"},
    {title: "Queen", duration: "06-11-2017"},
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
