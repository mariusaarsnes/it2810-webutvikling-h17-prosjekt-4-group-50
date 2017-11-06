import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchHistoryListComponent } from './components/search-history-list/search-history-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SearchHistoryListComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule
  ],
  providers: [

  ],
  bootstrap: [ProfileComponent]
})
export class AppModule { }
