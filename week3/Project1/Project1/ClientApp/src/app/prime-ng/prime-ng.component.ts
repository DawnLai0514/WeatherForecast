import { Component } from '@angular/core';

@Component({
  selector: 'app-prime-ng',
  templateUrl: './prime-ng.component.html',
  styleUrls: ['./prime-ng.component.css']
})
export class PrimeNGComponent {
  Array: { id: number, date: string, tempC: number, tempF: number, summary: string }[] = []
  constructor() {
    this.Array = [
      {
        id: 1,
        date: "2000-05-14",
        tempC: 25,
        tempF: 70,
        summary:"Hot"
      },
      {
        id: 2,
        date: "2001-05-14",
        tempC: 26,
        tempF: 75,
        summary: "Hot"
      },
      {
        id: 3,
        date: "2002-05-14",
        tempC: 27,
        tempF: 80,
        summary: "Cool"
      }
    ]
  }
}
