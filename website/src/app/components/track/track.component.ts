import {Component, OnInit, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {SongResponse} from "../../interfaces/song-response.interface";

@Component({
    selector: 'app-track',
    templateUrl: './track.component.html',
    styleUrls: ['../../../assets/styles/sharedStyles/search-result-element.css']
})
export class TrackComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {

    }
    //the track rendered
    @Input() track: SongResponse;



}


