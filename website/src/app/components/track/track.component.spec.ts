import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrackComponent} from './track.component';
import {MatDialog, MatDialogModule} from '@angular/material';
import {OVERLAY_PROVIDERS, ScrollStrategyOptions} from '@angular/cdk/overlay';
import {ScrollDispatcher, ViewportRuler} from '@angular/cdk/scrolling';
import {Platform} from '@angular/cdk/platform';

describe('TrackComponent', () => {
    let component: TrackComponent;
    let fixture: ComponentFixture<TrackComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrackComponent],
            providers: [
                MatDialog,
                ScrollStrategyOptions,
                ScrollDispatcher,
                Platform,
                ViewportRuler,
                OVERLAY_PROVIDERS
            ],
            imports: [MatDialogModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackComponent);
        component = fixture.componentInstance;
        component.track = {
            _id: 'id',
            name: 'track1',
            album: 'album',
            albumData: {_id: 'id', name: 'album', imageLink: 'link', songs: [], songsData: [], artists: [], artistsData: []},
            artists: [],
            duration:[]
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
