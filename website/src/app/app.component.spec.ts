import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {FormsModule} from '@angular/forms';
import {ArtistComponent} from './components/artist/artist.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AlbumComponent} from './components/album/album.component';
import {TrackComponent} from './components/track/track.component';
import {DataService} from './data.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

class MockDataService {
    isLoggedIn = true;
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                NavbarComponent,
                SearchPageComponent,
                LoginComponent,
                RegisterComponent,
                SearchResultComponent,
                ArtistComponent,
                AlbumComponent,
                TrackComponent

            ],
            providers: [{provide: DataService, useClass: MockDataService},
                HttpClient, HttpHandler],
            imports: [
                RouterTestingModule,
                FormsModule
            ]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app');
    }));
});
