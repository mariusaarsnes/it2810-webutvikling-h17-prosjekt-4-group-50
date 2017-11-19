import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoryComponent} from './history.component';
import {SearchHistoryListComponent} from '../search-history-list/search-history-list.component';
import {MatCell, MatCellDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable} from '@angular/material';
import {CdkColumnDef} from '@angular/cdk/table';
import {DataService} from '../../data.service';
import {HttpClient} from '@angular/common/http';
import {HttpHandler} from '@angular/common/http';

describe('HistoryComponent', () => {
    let component: HistoryComponent;
    let fixture: ComponentFixture<HistoryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HistoryComponent,
                SearchHistoryListComponent,
                MatHeaderCell,
                MatCell,
                MatCellDef,
                MatHeaderRow,
                MatHeaderRowDef,
                MatRow,
                MatRowDef,
                MatTable
            ],
            providers: [
                CdkColumnDef, DataService, HttpClient, HttpHandler
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
