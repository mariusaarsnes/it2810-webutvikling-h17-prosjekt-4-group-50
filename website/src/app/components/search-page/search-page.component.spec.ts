import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchPageComponent} from './search-page.component';
import {SearchResultComponent} from '../search-result/search-result.component';
import {FormsModule} from '@angular/forms';
import {ArtistComponent} from '../artist/artist.component';
import {DataService} from '../../data.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('SearchPageComponent', () => {
    let component: SearchPageComponent;
    let fixture: ComponentFixture<SearchPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchPageComponent,
                SearchResultComponent,
                ArtistComponent
            ],
            imports: [
                FormsModule
            ],
            providers: [
                DataService,
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
