import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../data.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username = '';
    password = '';
    result = '';

    constructor(private router: Router, private searchService: DataService) {

    }

    ngOnInit() {

    }

    updateErrorText(text) {
        let elem: HTMLElement = document.getElementById('errorText');
        elem.setAttribute('style', 'display: block');
        this.result = text;
    }

    onSubmit() {
        this.searchService.login(this.username, this.password).subscribe(data => {
            if (data['failed'] === 'false') {
                this.router.navigate(['/search']);
                this.searchService.loggedIn = true;
            } else {
                this.updateErrorText(data['message']);
            }
        });
    }

}
