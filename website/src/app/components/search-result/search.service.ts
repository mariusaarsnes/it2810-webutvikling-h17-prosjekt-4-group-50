import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  constructor() { }


  getArtists(): Promise<string[]> {
    return Promise.resolve(["hei", "hei", "hei"]);
  };

}
