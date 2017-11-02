import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	username = "";
	password = "";
	result = "";

	constructor(private http: HttpClient) {
	}

	ngOnInit() {
	}

	onSubmit() {
		this.http.post("api/create_user/", {username: this.username, password: this.password}).subscribe(data => {
			console.log(data);
			if (!data["message"]) {
				this.result = "New user created!";
			} else {
				this.result = data["message"];
			}
		});
	}

}
