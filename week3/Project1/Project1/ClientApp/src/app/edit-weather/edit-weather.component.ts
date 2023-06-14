import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Modal2Component } from '../modal2/modal2.component';
@Component({
  selector: 'app-edit-weather',
  templateUrl: './edit-weather.component.html',
  styleUrls: ['./edit-weather.component.css']
})
export class EditWeatherComponent implements OnInit {
  constructor(private http: HttpClient, private ngbModal: NgbModal, private dataSvc: DataService, private route: ActivatedRoute, private router: Router) { }
  isEdit: boolean = false
  editWeatherId: number = 0
  editWeatherDate: string = ''
  editWeatherTemC: number = 0
  editWeatherSummary: string = ''
  weatherArray: { id: number, date: string, temperatureC: number, temperatureF: number, summary: string }[] = []

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = Number(params.get('id'))
      var date = String(params.get('date'))
      var tem = Number(params.get('tem'))
      var summary = String(params.get('summary'))
      this.edit(id, date, tem, summary);
    });
  }

  edit(id: number, date: string, temperatureC: number, summary: string) {
    this.editWeatherId = id
    this.editWeatherDate = date
    this.editWeatherTemC = temperatureC
    this.editWeatherSummary = summary
    this.isEdit = true
  }

  editWeather() {
    if (this.editWeatherDate == "" || isNaN(this.editWeatherTemC) || this.editWeatherTemC.toString() == "" || this.editWeatherSummary == "") {
      this.dataSvc.setMessage("輸入有誤");
      this.ngbModal.open(ModalComponent);
    }
    else {
      this.http.post("https://localhost:44337/WeatherForecast/UpdateData",
        {
          id: this.editWeatherId,
          date: this.editWeatherDate,
          temperatureC: this.editWeatherTemC,
          summary: this.editWeatherSummary
        })
        .subscribe((res: any) => {
          this.weatherArray = res
        })
      this.dataSvc.setMessage("修改成功");
      const modal = this.ngbModal.open(ModalComponent);
      modal.result.then(
        (result) => {
          if (result == true) {
            this.router.navigateByUrl('/weather');
          }
        }
      )
    }

    this.isEdit = false
    this.editWeatherId = 0
    this.editWeatherDate = ''
    this.editWeatherTemC = 0
    this.editWeatherSummary = ''

  }


}
