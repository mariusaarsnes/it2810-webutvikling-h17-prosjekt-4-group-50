import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material';
import {AppComponent} from './app.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {FormsModule} from "@angular/forms";
import {SearchResultComponent} from './components/search-result/search-result.component';
import {ArtistComponent} from './components/artist/artist.component';
import {SearchService} from "./components/search-result/search.service";
import {DialogComponent} from "./components/dialog/dialog.component";
import {AlbumService} from "./components/artist/album.service";
import {LoginComponent} from './login/login.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './register/register.component';
import {CanActivateService} from "./shared/auth/can-activate.service";
import {Permissions} from "./shared/auth/Permissions";

@NgModule({
	declarations: [
		AppComponent,
		ProfileComponent,
		NavbarComponent,
		SearchPageComponent,
		SearchResultComponent,
		ArtistComponent,
		DialogComponent,
		LoginComponent,
		RegisterComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		MatDialogModule,
		RouterModule.forRoot([
			{
				path: 'search',
				component: SearchPageComponent,

			},
			{
				path: 'login',
				component: LoginComponent,
			},
			{
				path: 'register',
				component: RegisterComponent,
			}
		]),
		HttpClientModule
	],
	entryComponents: [DialogComponent],
	providers: [SearchService, AlbumService, CanActivateService, Permissions, HttpClient],
	bootstrap: [AppComponent]
})

export class AppModule {
}
