import { Injectable } from '@angular/core';
import { ArtistResponse } from "../../interfaces/artist-response.interface";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  getArtists(name: string, amount: number, index: number, filter: string, filterValue: string, sort: string, sortType: string): Promise<ArtistResponse[]> {
  	console.log('api/artists/' +  name + '/' + sort + '/' + sortType + '/' + filter + '/' + filterValue + '/' + index + '/' + amount);
  	return this.http.get<ArtistResponse[]>('api/artists/' +  name + '/' + sort + '/' + sortType + '/' + filter + '/' + filterValue + '/' + index + '/' + amount).toPromise();
  }

}
