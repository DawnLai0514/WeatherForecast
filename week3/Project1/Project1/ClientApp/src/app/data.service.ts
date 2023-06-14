import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  msg: string ="";
  constructor() { }
  setMessage(value: string) {
    this.msg = value;
  }

  getMessage() {
    return this.msg;
  }
}
