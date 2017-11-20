import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SongDialogComponent} from './song-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material';

describe('SongDialogComponent', () => {
    let component: SongDialogComponent;
    let fixture: ComponentFixture<SongDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SongDialogComponent],
            providers: [{provide: MAT_DIALOG_DATA, useValue: []}, {provide: MatDialogRef, useValue: []}],
            imports: [MatDialogModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SongDialogComponent);
        component = fixture.componentInstance;
        component.data = [{},{
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
});
