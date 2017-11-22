import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {SearchHistoryListComponent} from './components/search-history-list/search-history-list.component';
import {AppComponent} from './app.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {FormsModule} from '@angular/forms';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {ArtistComponent} from './components/artist/artist.component';
import {RegisterComponent} from './components/register/register.component';
import {NavbarProfileComponent} from './shared/navbar-profile/navbar-profile.component';
import {MyInfoComponent} from './components/my-info/my-info.component';
import {HistoryComponent} from './components/history/history.component';
import {DataService} from './data.service';
import {DialogComponent} from './components/dialog/dialog.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AgWordCloudModule} from 'angular4-word-cloud';
import {WordcloudComponent} from './components/wordcloud/wordcloud.component';
import {FavoriteArtistsComponent} from './components/favorite-artists/favorite-artists.component';
import {CanActivateService} from './shared/auth/can-activate.service';
import {Permissions} from './shared/auth/Permissions';
import {LoginComponent} from './components/login/login.component';
import {NavbarSearchComponent} from './shared/navbar-search/navbar-search.component';
import { AlbumComponent } from './components/album/album.component';
import {TrackComponent} from "./components/track/track.component";
import { DialogTableComponent } from './components/dialog-table/dialog-table.component';
import {
    MatTableModule,
    MatDialogModule
} from '@angular/material';
import { SongDialogComponent } from './components/song-dialog/song-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        SearchHistoryListComponent,
        NavbarComponent,
        SearchPageComponent,
        SearchResultComponent,
        ArtistComponent,
        DialogComponent,
        RegisterComponent,
        LoginComponent,
        NavbarSearchComponent,
        NavbarProfileComponent,
        MyInfoComponent,
        HistoryComponent,
        WordcloudComponent,
        FavoriteArtistsComponent,
        TrackComponent,
        AlbumComponent,
        DialogTableComponent,
        SongDialogComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        MatTableModule,
        AgWordCloudModule.forRoot(),
        RouterModule.forRoot([
            {
                path: 'search',
                component: NavbarSearchComponent,
                canActivate: [CanActivateService]
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'profilepage',
                component: ProfileComponent,
                canActivate: [CanActivateService],
                children: [
                    {path: '', redirectTo: 'my-info', pathMatch: 'full'},
                    {path: 'my-info', component: MyInfoComponent},
                    {path: 'history', component: HistoryComponent}
                ]
            },
            {
                path: '**',
                redirectTo: 'search',
            },
        ])
    ],
    providers: [DataService, CanActivateService, Permissions, HttpClient],
    entryComponents: [
        DialogComponent,
        SongDialogComponent,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})

export class AppModule {
}
