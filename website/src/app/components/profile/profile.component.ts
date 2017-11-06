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

  username = "Testbruker123"
  password = "pass123"
  since = "06-11-2017"
}
