import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {FormsModule} from "@angular/forms";
import {SearchResultComponent} from './components/search-result/search-result.component';
import {ArtistComponent} from './components/artist/artist.component';
import {SearchService} from "./components/search-result/search.service";
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './register/register.component';

@NgModule({
	declarations: [
		AppComponent,
		ProfileComponent,
		NavbarComponent,
		SearchPageComponent,
		SearchResultComponent,
		ArtistComponent,
		LoginComponent,
		RegisterComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule.forRoot([
			{
				path: 'search',
				component: SearchPageComponent
			}
		]),
		HttpClientModule
	],
	providers: [SearchService],
	bootstrap: [AppComponent]
})

export class AppModule {
}
