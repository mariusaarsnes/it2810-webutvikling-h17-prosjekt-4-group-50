import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavbarComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'search',
        component: SearchPageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
