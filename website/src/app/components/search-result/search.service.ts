import { Injectable } from '@angular/core';
import { ARTISTS } from './mock-artists';
import { Artist } from '../artist/artist';

@Injectable()
export class SearchService {

  constructor() { }

  getArtists(): Promise<Artist[]> {
    return Promise.resolve(ARTISTS);
  };

}
