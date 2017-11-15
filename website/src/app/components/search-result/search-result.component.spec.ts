import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchResultComponent} from './search-result.component';
import {ArtistComponent} from '../artist/artist.component';
import {SearchService} from './search.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('SearchResultComponent', () => {
    let component: SearchResultComponent;
    let fixture: ComponentFixture<SearchResultComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchResultComponent,
                ArtistComponent
            ],
            providers: [
                SearchService,
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
