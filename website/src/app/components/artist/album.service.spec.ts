import { TestBed, inject } from '@angular/core/testing';

import { AlbumService } from './album.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('AlbumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlbumService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([AlbumService], (service: AlbumService) => {
    expect(service).toBeTruthy();
  }));
});
