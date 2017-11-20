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
    MatTable
} from '@angular/material';
import {DataService} from '../../data.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('MyInfoComponent', () => {
    let component: MyInfoComponent;
    let fixture: ComponentFixture<MyInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MyInfoComponent,
                FavoriteArtistsComponent,
                MatHeaderCell,
                MatHeaderCellDef,
                MatCell,
                MatCellDef,
                MatHeaderRow,
                MatHeaderRowDef,
                MatRow,
                MatRowDef,
                MatTable
            ],
            providers: [
                DataService,
                HttpClient,
                HttpHandler
            ]
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
