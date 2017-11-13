import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchHistoryListComponent} from './search-history-list.component';
import {MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatRowDef, MatTable, MatTableModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

describe('SearchHistoryListComponent', () => {
    let component: SearchHistoryListComponent;
    let fixture: ComponentFixture<SearchHistoryListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchHistoryListComponent,
                MatTable,
                MatHeaderCell,
                MatCell,
                MatHeaderRow,
                MatRow,
            ],
             providers: [
                 {provide: MatTable, useValue: 'test'},
                 {provide: MatRowDef, useValue: {Columns:8}},
                 MatTableModule
             ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchHistoryListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
