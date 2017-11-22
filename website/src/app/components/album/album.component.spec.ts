import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlbumComponent} from './album.component';
import {MatDialogModule} from '@angular/material';
import {DataService} from '../../data.service';
import {HttpClient, HttpHandler} from '@angular/common/http';


class MockDataService {
    isLoggedIn = true;
}

describe('AlbumComponent', () => {
    let component: AlbumComponent;
    let fixture: ComponentFixture<AlbumComponent>;
    let de;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AlbumComponent],
            providers: [{provide: DataService, useClass: MockDataService}, HttpClient, HttpHandler],
            imports: [MatDialogModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlbumComponent);
        de = fixture.debugElement;
        component = fixture.componentInstance;
        component.album = {_id: 'if', name: 'name', imageLink: 'imageLin', songs: [], songsData: [], artists: [], artistsData: []};
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('Should show correct information about the album', () => {
        const compiled = de.nativeElement;
        expect(compiled.querySelector('h4').textContent).toBe(component.album.name);
        expect(compiled.querySelector('p').textContent).toBe(component.album.songs.length + ' songs');
    });
});
