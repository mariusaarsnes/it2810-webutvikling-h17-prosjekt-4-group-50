import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data.service';
import {UserResponse} from '../../interfaces/user-response.interface';

@Component({
    selector: 'app-navbar-profile',
    templateUrl: './navbar-profile.component.html',
    styleUrls: ['./navbar-profile.component.css']
})
export class NavbarProfileComponent implements OnInit {

    constructor(private searchService: DataService) {
    }

    ngOnInit() {
        //fetch user when the component is initialized
        this.searchService.getUser().subscribe(data => {
            this.user = data;
        })
    }

    //current user
    user: UserResponse;
    //current under page
    underPage = "my-info";
    //function for changing what under page is selected
    selectUnderPage(e): void {
        this.underPage = e.target.dataset["name"]; //set under page
    }
}
