import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FavoriteArtistsComponent} from './favorite-artists.component';
import {
    MatCell, MatDialog, MatDialogModule, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from '@angular/material';
import {DataService} from '../../data.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {OVERLAY_PROVIDERS, ScrollStrategyOptions} from '@angular/cdk/overlay';
import {ScrollDispatcher} from '@angular/cdk/scrolling';
import {Platform} from '@angular/cdk/platform';

describe('FavoriteArtistsComponent', () => {
    let component: FavoriteArtistsComponent;
    let fixture: ComponentFixture<FavoriteArtistsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FavoriteArtistsComponent,
                MatHeaderCell, MatCell,
                MatHeaderRow, MatHeaderRowDef,
                MatRow, MatRowDef,
                MatTable],
            providers: [
                DataService, HttpClient, HttpHandler, MatDialog, OVERLAY_PROVIDERS, ScrollStrategyOptions, ScrollDispatcher, Platform
            ],
            imports: [
                MatDialogModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FavoriteArtistsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
