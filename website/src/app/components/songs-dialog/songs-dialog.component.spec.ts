import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SongsDialogComponent} from './songs-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

describe('SongsDialogComponent', () => {
    let component: SongsDialogComponent;
    let fixture: ComponentFixture<SongsDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SongsDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: []},
                {provide: MatDialogRef, useValue: []}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SongsDialogComponent);
        component = fixture.componentInstance;
        component.data = [{_id: 'id', imageLink: 'link', genres: ['genre1', 'genre2']}, {}];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
