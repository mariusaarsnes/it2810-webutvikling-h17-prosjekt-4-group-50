import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

export interface DataResult {
	result: boolean;
}

export class Permissions {

	constructor() {

	}

	isLoggedIn(http: HttpClient): Observable<DataResult> {
		return http.get<DataResult>("/api/logged_in");
	}

	canActivate(http: HttpClient): Observable<boolean> {
		return this.isLoggedIn(http).map(value => {
			if (value.result)
				return true;
			return false;
		});
	}

}
