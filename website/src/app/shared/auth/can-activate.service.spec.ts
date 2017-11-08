import { TestBed, inject } from '@angular/core/testing';

import { CanActivateService } from './can-activate.service';
import {Permissions} from './Permissions';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('CanActivateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateService, Permissions, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([CanActivateService], (service: CanActivateService) => {
    expect(service).toBeTruthy();
  }));
});
