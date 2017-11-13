import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // USER INFO
  username = "Testbruker123"
  profileType = "user"
  since = "06-11-2017"
}
