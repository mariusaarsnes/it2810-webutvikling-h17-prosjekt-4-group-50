import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
  recentSearches = ["Queen", "Johnny Cash", "Rapsody", "Yellow", "Coldplay"]
}
