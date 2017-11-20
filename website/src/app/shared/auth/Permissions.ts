import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Router} from "@angular/router";

export interface DataResult {
    result: boolean;
}

export class Permissions {

    constructor() {

    }

    isLoggedIn(http: HttpClient): Observable<DataResult> {
        return http.get<DataResult>('/api/logged_in');
    }

    canActivate(http: HttpClient, router: Router): Observable<boolean> {
        return this.isLoggedIn(http).map(value => {
            if (value.result)
                return true;
            router.navigate(['/login']);
            return false;
        });
    }

}
