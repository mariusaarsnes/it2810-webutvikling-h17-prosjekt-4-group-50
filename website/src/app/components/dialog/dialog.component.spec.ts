import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogComponent} from './dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatHeaderRowDef, MatTableModule} from '@angular/material';
import {By} from '@angular/platform-browser';
import {DialogTableComponent} from '../dialog-table/dialog-table.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('DialogComponent', () => {
    let component: DialogComponent;
    let fixture: ComponentFixture<DialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogComponent, DialogTableComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValues: {}},
            ],
            imports: [MatDialogModule, MatTableModule],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogComponent);
        component = fixture.componentInstance;
        component.data = [{
            name: 'name',
            imageLink: 'link',
            genres: ['1', '2', '3'],
            popularity: 70,
            album: {name: 'album', imageLink: 'link'}
        }];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should show correct information in the dialog', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent.trim()).toBe(component.data[0].name);
        expect(compiled.querySelector('p').textContent).toBe('Genres: ' + component.data[0].genres[0] + ', ' +
            component.data[0].genres[1] + ', ' + component.data[0].genres[2]);
        expect(compiled.querySelector('p').nextElementSibling.textContent).toBe('Popularity: ' + component.data[0].popularity);
        expect(compiled.querySelector('img').getAttribute('src')).toBe(component.data[0].imageLink);
    });
});
