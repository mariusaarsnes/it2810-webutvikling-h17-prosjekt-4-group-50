import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username = '';
    password = '';
    result = '';

    constructor(private http: HttpClient, private router: Router) {
        /*this.http.get("/api/logged_in").subscribe(data => {
            if (data["result"])
                this.router.navigate(['/search']);
        });*/
    }

    ngOnInit() {

    }

    onSubmit() {
        this.http.post('api/login/', {username: this.username, password: this.password}).subscribe(data => {
            if (data['failed'] === 'false') {
                this.router.navigate(['/search']);
            } else {
                this.result = data['message'];
            }
        });
    }

}
