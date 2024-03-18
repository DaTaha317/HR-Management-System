import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

/*********************************************************************** */
// -> we are making incrementor and decrementor because we may have multipe requests
/*********************************************************************** */

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  bustRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.bustRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333'
    })
  }

  idle() {
    this.bustRequestCount--;
    if (this.bustRequestCount <= 0) {
      this.bustRequestCount = 0;
      this.spinnerService.hide();
    }
  }

}
