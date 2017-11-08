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
import {HttpClientModule} from "@angular/common/http";
import {AdditionalInfoComponent} from "./components/additional_info/additional-info.component";
import {AdditionalInfoService} from "./components/additional_info/additional-info.service";
import {DialogComponent} from "./components/artist/dialog.component";
import {CanActivateService} from "./shared/auth/can-activate.service";
import {Permissions} from "./shared/auth/Permissions";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {NavbarSearchComponent} from './shared/navbar-search/navbar-search.component';
import {TrackComponent} from "./components/track/track.component";


@NgModule({
	declarations: [
		AppComponent,
		ProfileComponent,
		NavbarComponent,
		SearchPageComponent,
		SearchResultComponent,
		ArtistComponent,
		AdditionalInfoComponent,
		DialogComponent,
		RegisterComponent,
		LoginComponent,
		NavbarSearchComponent,
		TrackComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		FormsModule,
		MatDialogModule,
		RouterModule.forRoot([
			{
				path: 'search',
				component: NavbarSearchComponent,
				//canActivate: [CanActivateService]

			},
			{
				path: 'login',
				component: LoginComponent,
			},
			{
				path: 'register',
				component: RegisterComponent,
			}
		])
	],
	entryComponents: [
		DialogComponent
	],
	providers: [SearchService, AdditionalInfoService, CanActivateService, Permissions],
	bootstrap: [AppComponent]

})

export class AppModule {
}
