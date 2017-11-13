import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArtistComponent} from './artist.component';
import {MAT_DIALOG_SCROLL_STRATEGY, MatDialog} from '@angular/material';
import {Overlay, OVERLAY_PROVIDERS, OverlayContainer, ScrollStrategyOptions} from '@angular/cdk/overlay';
import {ScrollDispatcher, ViewportRuler} from '@angular/cdk/scrolling';
import {Platform} from '@angular/cdk/platform';


describe('ArtistComponent', () => {
    let component: ArtistComponent;
    let fixture: ComponentFixture<ArtistComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ArtistComponent],
            providers: [
                MatDialog, Overlay, ScrollStrategyOptions,
                ScrollDispatcher, Platform, ViewportRuler,
                OverlayContainer, OVERLAY_PROVIDERS,
                {provide: MAT_DIALOG_SCROLL_STRATEGY, useValue: {}},
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArtistComponent);
        component = fixture.componentInstance;
        // Creating a mock artist to test that the rendering is correct
        component.artist = {
            _id: '123', name: 'test', type: 'artist', popularity: 99, album: ['1', '2'], __v: 12,
            genres: ['genre 1', 'genre 2'], imageLink: 'link'
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
