import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../components/search-result/search.service';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  //SEARCH HISTORY
  uniqueSearches = 60
  totalSearches = 104
}
