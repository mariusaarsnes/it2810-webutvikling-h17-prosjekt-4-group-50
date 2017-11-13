import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../components/search-result/search.service';
import { UserResponse } from '../../interfaces/user-response.interface';
import { MatDialog } from '@angular/material';
import { ArtistResponse } from '../../interfaces/artist-response.interface';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

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

    //SEARCH HISTORY
    uniqueSearches = 60
    totalSearches = 104
}
