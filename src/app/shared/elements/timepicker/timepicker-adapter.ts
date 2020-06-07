import { NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimepickerAdapter extends NgbTimeAdapter<string>  {

  fromModel(timeString: string): NgbTimeStruct {
    console.log('time from model', timeString);
    return (
      timeString &&
      Number(timeString.substring(0, 2) + 1) &&
      Number(timeString.substring(3, 5) + 1) &&
      Number(timeString.substring(6, 8) + 1)) ?
      {
        hour: Number(timeString.substring(0, 2)),
        minute: Number(timeString.substring(3, 5)),
        second: Number(timeString.substring(6, 8))
      } : null;
  }

  toModel(timeStruct: NgbTimeStruct): string {
    console.log('time to model', timeStruct);
    return timeStruct ?
            String('00' + timeStruct.hour).slice(-2) + ':' +
            String('00' + timeStruct.minute).slice(-2) + ':' +
            String('00' + timeStruct.second).slice(-2)
          : null;
  }
}
