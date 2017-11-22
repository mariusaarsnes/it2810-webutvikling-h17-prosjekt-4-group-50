import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private searchService: DataService, private router: Router) {
    }

    ngOnInit() {

    }

    logout() {
        this.searchService.logout().subscribe(data => {
            this.router.navigate(['/login']);
            this.searchService.loggedIn = false;
        });
    }

}
