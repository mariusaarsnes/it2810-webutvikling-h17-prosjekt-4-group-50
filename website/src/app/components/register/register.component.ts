import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DataService} from "../../data.service";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	username = "";
	password = "";
	result = "";

	constructor(private router: Router, private searchService: DataService) {

	}

	ngOnInit() {

	}

	onSubmit() {
		if (this.username.length < 3)
			this.result = "Your username needs to have atleast 3 characters!";
		else if (this.password === "")
			this.result = "Your password field is empty! Please fill it out!";
		else {
		    this.searchService.register(this.username, this.password).subscribe(data => {
				if (!data["message"])
					console.log("");
				else
					this.result = data["message"];
			});
		}
	}

}
