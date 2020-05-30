import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DatepickerAdapter extends NgbDateAdapter<string>  {

  fromModel(date: string): NgbDateStruct {
    return (date && Number(date.substring(0, 2)) && Number(date.substring(3, 5) + 1) && Number(date.substring(6, 10))) ?
      {
        day: Number(date.substring(0, 2)),
        month: Number(date.substring(3, 5)),
        year: Number(date.substring(6, 10))
      } : null;
  }

  toModel(date: NgbDateStruct): string {
    return date ? String('00' + date.day).slice(-2) + '/' + String('00' + date.month).slice(-2)
      + '/' + date.year.toString() : null;
  }

}
