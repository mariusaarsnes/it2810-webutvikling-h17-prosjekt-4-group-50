import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
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

    constructor(private searchService: DataService) { }

    ngOnInit() {
        this.searchService.getUser().subscribe(data => {
            this.user = data;
            this.profileType = data.isAdmin ? "admin" : "user"
            this.date = data.date_registered.substr(0,10);
        });
        this.searchService.getSearchHistoryData().subscribe(data => {
            this.uniqueSearches = data.distinct_count;
            this.totalSearches = data.total_count;
        })
    }

    user: UserResponse;
    profileType: string;
    date: string;

    //SEARCH HISTORY
    uniqueSearches: string;
    totalSearches: string;
}
