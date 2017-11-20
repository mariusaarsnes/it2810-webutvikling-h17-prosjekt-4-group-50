import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'dialog-table',
  templateUrl: './dialog-table.component.html',
  styleUrls: ['./dialog-table.component.css']
})
export class DialogTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayedColumns =['name'];
  dataSource;

}

export interface Element {
    name: string;
}

const ELEMENT_DATA: Element[] = [
    {name: 'Hallo'},
    {name: 'Halla'},
    {name: 'Mohahah'},
];
