import {inject, TestBed} from '@angular/core/testing';

import {CanActivateService} from './can-activate.service';
import {Permissions} from './Permissions';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('CanActivateService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CanActivateService, Permissions, HttpClient, HttpHandler],
            imports: [
                RouterTestingModule
            ]
        });
    });

    it('should be created', inject([CanActivateService], (service: CanActivateService) => {
        expect(service).toBeTruthy();
    }));
});
