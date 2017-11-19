import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {NavbarProfileComponent} from '../../shared/navbar-profile/navbar-profile.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {DataService} from '../../data.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {UserResponse} from '../../interfaces/user-response.interface';
import {Observable} from 'rxjs/Observable';

class MockDataService {
    public getUser(): Observable<UserResponse> {
        return Observable.of();
    }
}
describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileComponent, NavbarProfileComponent],
            providers: [
                {provide: DataService, useClass: MockDataService},
                HttpClient,
                HttpHandler
            ],
            imports: [
                RouterTestingModule,
                FormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
