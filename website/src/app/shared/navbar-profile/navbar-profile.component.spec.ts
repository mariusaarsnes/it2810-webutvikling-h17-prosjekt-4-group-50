import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarProfileComponent} from './navbar-profile.component';
import {DataService} from '../../data.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {UserResponse} from '../../interfaces/user-response.interface';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';


class MockDataService {
    isLoggedIn = true;
    public getUser(): Observable<UserResponse> {
        return Observable.of();
    }
}
describe('NavbarProfileComponent', () => {
    let component: NavbarProfileComponent;
    let fixture: ComponentFixture<NavbarProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavbarProfileComponent],
            providers: [
                {provide: DataService, useClass: MockDataService},
                HttpClient, HttpHandler],
            imports: [
                RouterTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
