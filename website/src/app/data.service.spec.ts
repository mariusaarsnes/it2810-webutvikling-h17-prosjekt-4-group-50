import {async, inject, TestBed} from '@angular/core/testing';

import {DataService} from './data.service';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('DataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DataService,
                HttpClient,
                HttpHandler,
            ],
            imports: [
                HttpClientModule,
                HttpClientTestingModule]
        });
    });

    it('should be created', inject([DataService], (service: DataService) => {
        expect(service).toBeTruthy();
    }));
});
