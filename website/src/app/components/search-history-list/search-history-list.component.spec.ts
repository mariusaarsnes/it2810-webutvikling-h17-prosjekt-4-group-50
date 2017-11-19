import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchHistoryListComponent} from './search-history-list.component';
import {MatRowDef, MatTable, MatTableModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {DataService} from '../../data.service';
import {SearchHistoryResponse} from '../../interfaces/history-response.interface';
import {Observable} from 'rxjs/Observable';


class MockDataService {
    public getSearchHistory(): Observable<SearchHistoryResponse> {
        return Observable.of();
    }
}
describe('SearchHistoryListComponent', () => {
    let component: SearchHistoryListComponent;
    let fixture: ComponentFixture<SearchHistoryListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchHistoryListComponent,
            ],
            providers: [
                {provide: MatRowDef, useValue: {Columns: 8}},
                {provide: DataService, useClass: MockDataService}
            ],
            imports: [
                MatTableModule
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
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
