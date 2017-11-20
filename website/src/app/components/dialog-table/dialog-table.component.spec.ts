import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DialogTableComponent} from './dialog-table.component';
import {MatDialogModule, MatTableModule} from '@angular/material';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {DialogComponent} from '../dialog/dialog.component';

describe('DialogTableComponent', () => {
    let component: DialogTableComponent;
    let fixture: ComponentFixture<DialogTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogTableComponent],
            imports: [MatDialogModule, MatTableModule],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
