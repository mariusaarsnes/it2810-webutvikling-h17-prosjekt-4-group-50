import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username = "";
	password = "";
	result = "";

	constructor(private http: HttpClient) {

	}

	ngOnInit() {

	}

	onSubmit() {
		this.http.post("api/login/", {username: this.username, password: this.password}).subscribe(data => {
			if (data["failed"] === 'false') {
				//TODO - Handle routing to some page after login was successful
			} else {
				this.result = data["message"];
			}
		});
	}

}
