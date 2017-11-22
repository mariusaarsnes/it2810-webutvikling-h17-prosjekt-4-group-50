import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchResultComponent} from './search-result.component';
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

describe('SearchResultComponent', () => {
    let component: SearchResultComponent;
    let fixture: ComponentFixture<SearchResultComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchResultComponent,
                ArtistComponent,
                AlbumComponent,
                TrackComponent
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
        fixture = TestBed.createComponent(SearchResultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
