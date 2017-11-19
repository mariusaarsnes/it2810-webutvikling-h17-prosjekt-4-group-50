import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArtistComponent} from './artist.component';
import {MAT_DIALOG_SCROLL_STRATEGY, MatDialogModule} from '@angular/material';
import {Overlay, OVERLAY_PROVIDERS, OverlayContainer, ScrollStrategyOptions} from '@angular/cdk/overlay';
import {ScrollDispatcher, ViewportRuler} from '@angular/cdk/scrolling';
import {Platform} from '@angular/cdk/platform';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {DataService} from '../../data.service';


describe('ArtistComponent', () => {
    let component: ArtistComponent;
    let fixture: ComponentFixture<ArtistComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ArtistComponent],
            providers: [
                Overlay, ScrollStrategyOptions,
                ScrollDispatcher, Platform, ViewportRuler,
                OverlayContainer, OVERLAY_PROVIDERS,
                {provide: MAT_DIALOG_SCROLL_STRATEGY, useValue: {}}, DataService,
                HttpClient, HttpHandler
            ],
            imports: [
                MatDialogModule,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArtistComponent);
        component = fixture.componentInstance;

        // Creating a mock artist to test that the rendering is correct
        component.artist = {
            _id: '123', name: 'test', type: 'artist', popularity: 99, albums: ['1', '2'], __v: 12,
            genres: ['genre 1', 'genre 2'], imageLink: 'link', songs: ['song1', 'song2']
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should show correct information about the artist', () => {
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelector('h4').textContent).toBe(component.artist.name);
        expect(compiled.querySelector('p').textContent).toBe(component.artist.songs.length + ' albums');
    });
});
