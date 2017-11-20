import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyInfoComponent} from './my-info.component';
import {FavoriteArtistsComponent} from '../favorite-artists/favorite-artists.component';
import {
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable, MatTableModule
} from '@angular/material';
import {DataService} from '../../data.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UserResponse} from '../../interfaces/user-response.interface';
import {WordcloudComponent} from '../wordcloud/wordcloud.component';
import {AgWordCloudModule} from 'angular4-word-cloud';

class MockDataService {
    public getUser(): Observable<UserResponse> {
        return Observable.of();
    }
}
describe('MyInfoComponent', () => {
    let component: MyInfoComponent;
    let fixture: ComponentFixture<MyInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MyInfoComponent,
                FavoriteArtistsComponent,
                WordcloudComponent
            ],
            providers: [
                {provide: DataService, useClass: MockDataService},
                HttpClient,
                HttpHandler
            ],
            imports: [MatTableModule, AgWordCloudModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
