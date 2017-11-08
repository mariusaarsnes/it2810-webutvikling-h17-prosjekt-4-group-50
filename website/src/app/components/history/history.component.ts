import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  // USER INFO
  username = "Testbruker123"
  password = "pass123"
  since = "06-11-2017"


  //SEARCH HISTORY
  uniqueSearches = 60
  totalSearches = 104
}
