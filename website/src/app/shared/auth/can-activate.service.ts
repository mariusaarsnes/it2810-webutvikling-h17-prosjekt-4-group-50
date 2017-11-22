import {Injectable} from '@angular/core';
import {Permissions} from './Permissions';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CanActivateService implements CanActivate {

    constructor(private permissions: Permissions, private http: HttpClient, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.permissions.canActivate(this.http, this.router);
    }

}
