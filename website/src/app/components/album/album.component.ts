import {Component, Input, OnInit} from '@angular/core';
import {AlbumResponse} from "../../interfaces/album-response.interface";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor() { }

  @Input() album: AlbumResponse;

  ngOnInit() {
  }

}
