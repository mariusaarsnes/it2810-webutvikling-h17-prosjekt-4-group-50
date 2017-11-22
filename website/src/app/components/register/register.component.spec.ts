import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {DataService} from '../../data.service';
import {Mock} from 'protractor/built/driverProviders';

class MockDataService {
    public register() {
        return {};
    }
}
describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
            imports: [
                RouterTestingModule,
                FormsModule
            ],
            providers: [
                HttpClient,
                HttpHandler,
                {provide: DataService, useClass: MockDataService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
