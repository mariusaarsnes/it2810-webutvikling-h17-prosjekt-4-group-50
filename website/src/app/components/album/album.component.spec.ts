import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlbumComponent} from './album.component';

describe('AlbumComponent', () => {
    let component: AlbumComponent;
    let fixture: ComponentFixture<AlbumComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AlbumComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlbumComponent);
        component = fixture.componentInstance;
        component.album = {_id: 'if', name: 'name', imageLink: 'imageLin', songs: [], songsData: [], artists: [], artistsData: []};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
