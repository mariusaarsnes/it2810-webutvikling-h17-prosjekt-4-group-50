import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarSearchComponent} from './navbar-search.component';
import {SearchPageComponent} from '../../components/search-page/search-page.component';
import {FormsModule} from '@angular/forms';
import {SearchResultComponent} from '../../components/search-result/search-result.component';
import {ArtistComponent} from '../../components/artist/artist.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {DataService} from '../../data.service';
import {AlbumComponent} from '../../components/album/album.component';
import {TrackComponent} from '../../components/track/track.component';
import {UserResponse} from '../../interfaces/user-response.interface';
import {Observable} from 'rxjs/Observable';
import {ArtistResponse} from '../../interfaces/artist-response.interface';
import {AlbumResponse} from '../../interfaces/album-response.interface';
import {SongResponse} from '../../interfaces/song-response.interface';

class MockDataService {
    public getUser(): Observable<UserResponse> {
        return Observable.of();
    }
    public getArtists(): Observable<ArtistResponse[]> {
        return Observable.of([]);
    }
    public getAlbums(): Observable<AlbumResponse[]> {
        return Observable.of([]);
    }
    public getSongs(): Observable<SongResponse[]> {
        return Observable.of([]);
    }
}
describe('NavbarSearchComponent', () => {
    let component: NavbarSearchComponent;
    let fixture: ComponentFixture<NavbarSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavbarSearchComponent,
                SearchPageComponent,
                SearchResultComponent,
                ArtistComponent,
                AlbumComponent,
                TrackComponent],
            providers: [
                {provide: DataService, useClass: MockDataService},
                HttpClient, HttpHandler],
            imports: [
                FormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
