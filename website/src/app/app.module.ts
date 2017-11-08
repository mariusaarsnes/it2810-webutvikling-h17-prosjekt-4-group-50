<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { FormsModule } from "@angular/forms";
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ArtistComponent } from './components/artist/artist.component';
import { SearchService } from "./components/search-result/search.service";
import { AdditionalInfoComponent } from "./components/additional_info/additional-info.component";
import { AdditionalInfoService } from "./components/additional_info/additional-info.service";
import { DialogComponent} from "./components/artist/dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavbarComponent,
    SearchPageComponent,
    SearchResultComponent,
    ArtistComponent,
    AdditionalInfoComponent,
    DialogComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    RouterModule.forRoot([
      {
        path: 'search',
        component: SearchPageComponent
      },
      {
        path: 'info',
        component: AdditionalInfoComponent
      }
    ])
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [SearchService, AdditionalInfoService],
  bootstrap: [AppComponent]
=======
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
		LoginComponent,
		RegisterComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule.forRoot([
			{
				path: 'search',
				component: SearchPageComponent,
				canActivate: [CanActivateService]

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
	providers: [SearchService, CanActivateService, Permissions, HttpClient],
	bootstrap: [AppComponent]
>>>>>>> f8bd961127c3be983b34708ccf2f3561c128a736
})

export class AppModule {
}
