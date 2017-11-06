import { Injectable } from '@angular/core';
import { ArtistResponse } from "../../interfaces/artist-response.interface";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  getArtistsByName(name: string, amount: number, index: number): Promise<ArtistResponse[]> {
  	return this.http.get<ArtistResponse[]>('api/artists/' + name + '/' + index + '/' + amount).toPromise();
  }

}
