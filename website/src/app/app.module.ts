import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {MatDialogModule, MatTableModule} from '@angular/material';
import {SearchHistoryListComponent} from './components/search-history-list/search-history-list.component';
import {AppComponent} from './app.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {FormsModule} from '@angular/forms';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {ArtistComponent} from './components/artist/artist.component';
import {RegisterComponent} from './register/register.component';
import {NavbarProfileComponent} from './shared/navbar-profile/navbar-profile.component';
import {MyInfoComponent} from './components/my-info/my-info.component';
import {HistoryComponent} from './components/history/history.component';
import {SearchService} from './components/search-result/search.service';
import {DialogComponent} from './components/dialog/dialog.component';
import {AlbumService} from './components/artist/album.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CanActivateService} from './shared/auth/can-activate.service';
import {Permissions} from './shared/auth/Permissions';
import {APP_BASE_HREF} from '@angular/common';
import {AgWordCloudModule} from 'angular4-word-cloud';
import {WordcloudComponent} from './components/wordcloud/wordcloud.component';
import {LoginComponent} from './login/login.component';
import {NavbarSearchComponent} from './shared/navbar-search/navbar-search.component';
import {TrackComponent} from './components/track/track.component';

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
        TrackComponent,
        WordcloudComponent
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
                // canActivate: [CanActivateService]
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'wordcloud',
                component: WordcloudComponent
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'profilepage',
                component: ProfileComponent,
                children: [
                    {path: '', redirectTo: 'my-info', pathMatch: 'full'},
                    {path: 'my-info', component: MyInfoComponent},
                    {path: 'history', component: HistoryComponent}
                ]
            }
        ])
    ],
    providers: [AlbumService, SearchService, CanActivateService, Permissions, HttpClient],
    entryComponents: [
        DialogComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
