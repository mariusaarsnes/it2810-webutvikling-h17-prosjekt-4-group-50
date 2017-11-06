import { Injectable } from '@angular/core';
import { Artist } from "./artist";
import { ARTISTS } from "./mock-artists";


@Injectable()
export class ArtistService {
  getArtists(): Promise<Artist[]> {
    return Promise.resolve(ARTISTS);
  }
}
