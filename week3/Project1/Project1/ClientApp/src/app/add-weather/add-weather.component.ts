import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-weather',
  templateUrl: './add-weather.component.html',
  styleUrls: ['./add-weather.component.css']
})
export class AddWeatherComponent {
  constructor(private http: HttpClient, private ngbModal: NgbModal, private dataSvc: DataService, private router: Router) { }

  weatherArray: { id: number, date: string, temperatureC: number, temperatureF: number, summary: string }[] = []
  isCreate: boolean = false
  newWeatherDate: string = ''
  newWeatherTemC: number = 0
  newWeatherSummary: string = ''

  createNewWeather() {
    if (this.newWeatherDate == "" || this.newWeatherSummary == "") {
      this.dataSvc.setMessage("輸入不可為空");
      this.ngbModal.open(ModalComponent);
    }
    else {
      let url = "https://localhost:44337/WeatherForecast/AddData";
      this.http.post(url,
        {
          id: 0,
          date: this.newWeatherDate,
          temperatureC: this.newWeatherTemC,
          summary: this.newWeatherSummary
        })
        .subscribe((res: any) => {
          this.weatherArray = res
        })
      this.dataSvc.setMessage("新增成功");
      const modal = this.ngbModal.open(ModalComponent);
      modal.result.then(
        (result) => {
          if (result == true) {
            this.router.navigateByUrl('/weather');
          }
        }
      )
    }

    this.isCreate = false
    this.newWeatherDate = ''
    this.newWeatherTemC = 0
    this.newWeatherSummary = ''

  }
}
