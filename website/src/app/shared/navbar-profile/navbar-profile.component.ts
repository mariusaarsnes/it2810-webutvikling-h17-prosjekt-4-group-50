import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { UserResponse } from '../../interfaces/user-response.interface';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.css']
})
export class NavbarProfileComponent implements OnInit {

  constructor(private searchService: DataService) { }

  ngOnInit() {
      this.searchService.getUser().subscribe(data => {
          this.user = data;
      })
  }

  user: UserResponse;
}
