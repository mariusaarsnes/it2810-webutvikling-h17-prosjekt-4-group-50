import { Component, OnInit } from '@angular/core';
import {AdditionalInfo} from "./additional-info";
import {AdditionalInfoService} from "./additional-info.service";

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit{

  constructor(private additonalInfoService: AdditionalInfoService) {}

  additonalInfo: AdditionalInfo[];

  getAdditionalInfo(): void {
    this.additonalInfo = this.additonalInfoService.getAdditionalInfo();
  }
  ngOnInit(): void {
    
  }

}
