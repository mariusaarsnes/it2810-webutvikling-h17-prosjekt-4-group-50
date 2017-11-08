import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

export interface dataResult {
	result: boolean;
}

export class Permissions {

	constructor() {
	}

	isLoggedIn(http: HttpClient): Observable<dataResult> {
		return http.get<dataResult>("/api/logged_in");
	}

	canActivate(http: HttpClient): Observable<boolean> {
		return this.isLoggedIn(http).map(value => {
			if (value.result)
				return true;
			return false;
		});
	}

}
