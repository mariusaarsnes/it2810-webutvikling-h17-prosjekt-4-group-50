import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../components/search-result/search.service';
import { UserResponse } from '../../interfaces/user-response.interface';

@Component({
  selector: 'my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit() {
      this.searchService.getUser().subscribe(data => {
          this.user = data;
          this.profileType = data.isAdmin ? "admin" : "user"
          this.date = data.date_registered.substr(0,10);
      })
  }
  user: UserResponse;
  profileType: string;
  date: string;
}
