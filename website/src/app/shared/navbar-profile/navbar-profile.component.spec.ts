import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarProfileComponent} from './navbar-profile.component';
import {DataService} from '../../data.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('NavbarProfileComponent', () => {
    let component: NavbarProfileComponent;
    let fixture: ComponentFixture<NavbarProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavbarProfileComponent],
            providers: [DataService, HttpClient,HttpHandler]
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
