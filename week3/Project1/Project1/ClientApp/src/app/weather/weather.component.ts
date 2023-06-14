import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherList } from '../weather';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Modal2Component } from '../modal2/modal2.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit
{
  constructor(private http: HttpClient, private ngbModal: NgbModal, private dataSvc: DataService) { }
  weatherArray: { id: number, date: string, temperatureC: number, temperatureF: number, summary: string }[] = []
  selectArray: { id: number, date: string, temperatureC: number, temperatureF: number, summary: string }[] = []

  isCreate: boolean = false
  newWeatherDate: string = ''
  newWeatherTemC: number = 0
  newWeatherSummary: string = ''

  isEdit: boolean = false
  editWeatherId: number = 0
  editWeatherDate: string = ''
  editWeatherTemC: number = 0
  editWeatherSummary: string = ''

  isFilter: boolean = false
  filterTem: string = ''

  temDesc: boolean = false
  sumDesc: boolean = false
  dateDesc: boolean = false

  confirm:string=''



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
    }
    
    this.isCreate = false
    this.newWeatherDate = ''
    this.newWeatherTemC = 0
    this.newWeatherSummary = ''

  }
  deleteWeather(id: number) {
    this.dataSvc.setMessage("確認刪除?");
    const modal = this.ngbModal.open(Modal2Component);
    modal.result.then(
      (result) => {
        if (result == true) {
          this.http.post("https://localhost:44337/WeatherForecast/DeleteData", id, {
            headers: {
              Authentication: 'TEST'
            }})
            .subscribe((res: any) => {
              this.weatherArray = res
            })
        }
      }
    )
  }
  filterWeather(tem: string) {
    if (tem == "") {
      this.dataSvc.setMessage("搜尋內容不可為空");
      this.ngbModal.open(ModalComponent);
    }
    else {
      let headers = new HttpHeaders({
        'Content-Type': 'text/json'
      });
      let options = {
        headers
      };
      let data = JSON.stringify(tem);
      this.http.post("https://localhost:44337/WeatherForecast/FilterWeather", data, { headers})
        .subscribe((res: any) => {
          this.selectArray = res

          this.isFilter = true
          if (this.selectArray.length == 0) {
            this.dataSvc.setMessage("查無資料");
            this.ngbModal.open(ModalComponent);
          }
        })
     
    }
    
  }

  edit(id: number, date: string, temperatureC:number, summary:string) {
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
    }

    this.isEdit = false
    this.editWeatherId =0
    this.editWeatherDate = ''
    this.editWeatherTemC = 0
    this.editWeatherSummary = ''

  }
  getList() {
    let url = "https://localhost:44337/WeatherForecast/GetAllData";
    this.http.get(url).subscribe((res: any) => {
      this.weatherArray = res
    })
  }

  sort(input: string) {
    switch (input) {
      case "temperature":
        input = input + String(this.temDesc);
        this.temDesc = !this.temDesc
        break;

      case "summary":
        input = input + String(this.sumDesc);
        this.sumDesc = !this.sumDesc
        break;

      case "date":
        input = input + String(this.dateDesc);
        this.dateDesc = !this.dateDesc
        break;
    }
    let headers = new HttpHeaders({
      'Content-Type': 'text/json'
    });
    let options = {
      headers
    };
    let data = JSON.stringify(input);
    this.http.post("https://localhost:44337/WeatherForecast/Sort", data, options)
      .subscribe((res: any) => {
      this.weatherArray = res
    })
  }

  ngOnInit(): void {
    this.getList();
  }

  //weather: WeatherList[] = [
  //  { ID: 1, Date: '2023-01-01', TemperatureC: 21, Summary: "Freezing" },
  //  { ID: 2, Date: '2023-02-01', TemperatureC: 22, Summary: "Cool" },
  //  { ID: 3, Date: '2023-03-01', TemperatureC: 23, Summary: "Hot" }
  //];

  //nID = 0;
  //nTemperature = 0;
  //nDate = '';
  //nSummary = "";

  //selectedWeather?: WeatherList;
  //onSelect(wea: WeatherList): void {
  //  this.selectedWeather = wea;
  //  this.nID = wea.ID;
  //  this.nDate = wea.Date;
  //  this.nTemperature = wea.TemperatureC;
  //  this.nSummary = wea.Summary;
  //}



  //update() {
  //  let i = this.nID - 1;
  //  this.weather[i] = { ID:this.nID, Date: this.nDate, TemperatureC: this.nTemperature, Summary: this.nSummary };
  //}



}

