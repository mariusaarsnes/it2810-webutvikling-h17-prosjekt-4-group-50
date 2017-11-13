import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarSearchComponent} from './navbar-search.component';
import {SearchPageComponent} from '../../components/search-page/search-page.component';
import {FormsModule} from '@angular/forms';
import {SearchResultComponent} from '../../components/search-result/search-result.component';
import {ArtistComponent} from '../../components/artist/artist.component';
import {SearchService} from '../../components/search-result/search.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('NavbarSearchComponent', () => {
    let component: NavbarSearchComponent;
    let fixture: ComponentFixture<NavbarSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavbarSearchComponent, SearchPageComponent, SearchResultComponent, ArtistComponent],
            providers: [SearchService, HttpClient, HttpHandler],
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
