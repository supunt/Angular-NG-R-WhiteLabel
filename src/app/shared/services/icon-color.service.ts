import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconColorService {

  constructor() { }

  getUserIconColor() {
    return localStorage.getItem('iconColor') ? localStorage.getItem('iconColor')  : 'red';
  }
}
