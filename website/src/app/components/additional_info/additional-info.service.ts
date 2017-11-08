import { Injectable } from '@angular/core';
import { AdditionalInfo} from "./additional-info";
import { ADDITONALINFO } from "./mock-info";


@Injectable()
export class AdditionalInfoService {
  getAdditionalInfo(): AdditionalInfo[] {
    return ADDITONALINFO;
  }
}
