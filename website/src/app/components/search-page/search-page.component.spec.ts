import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchPageComponent} from './search-page.component';
import {SearchResultComponent} from '../search-result/search-result.component';
import {FormsModule} from '@angular/forms';
import {ArtistComponent} from '../artist/artist.component';
import {DataService} from '../../data.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {AlbumComponent} from '../album/album.component';
import {TrackComponent} from '../track/track.component';

class MockDataService {
    public getAlbums() {
        return {};
    }
    public getArtists() {
        return {};
    }
    public getSongs() {
        return {};
    }
}
describe('SearchPageComponent', () => {
    let component: SearchPageComponent;
    let fixture: ComponentFixture<SearchPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchPageComponent,
                SearchResultComponent,
                ArtistComponent,
                AlbumComponent,
                TrackComponent,

            ],
            imports: [
                FormsModule
            ],
            providers: [
                {provide: DataService, useClass: MockDataService},
                HttpClient,
                HttpHandler
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
