import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Modal2Component } from '../modal2/modal2.component';


@Component({
  selector: 'app-filter-weather',
  templateUrl: './filter-weather.component.html',
  styleUrls: ['./filter-weather.component.css']
})
export class FilterWeatherComponent implements OnInit{
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var filterTem = String(params.get('summary'))
      this.filterWeather(filterTem);
    });
    
  }
  constructor(private http: HttpClient, private ngbModal: NgbModal, private dataSvc: DataService, private route: ActivatedRoute, private router: Router) { }
  selectArray: { id: number, date: string, temperatureC: number, temperatureF: number, summary: string }[] = []
  weatherArray: { id: number, date: string, temperatureC: number, temperatureF: number, summary: string }[] = []
  
  isFilter: boolean = false

  filterWeather(tem: string) {
    if (tem == "") {
      this.dataSvc.setMessage("搜尋內容不可為空");
      const modal = this.ngbModal.open(ModalComponent);
      modal.result.then(
        (result) => {
          if (result == true) {
            this.router.navigateByUrl('/weather');
          }
        }
      )
    }
    else {
      let headers = new HttpHeaders({
        'Content-Type': 'text/json'
      });
      let options = {
        headers
      };
      let data = JSON.stringify(tem);
      this.http.post("https://localhost:44337/WeatherForecast/FilterWeather", data, { headers })
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

  deleteWeather(id: number) {
    this.dataSvc.setMessage("確認刪除?");
    const modal = this.ngbModal.open(Modal2Component);
    modal.result.then(
      (result) => {
        if (result == true) {
          this.http.post("https://localhost:44337/WeatherForecast/DeleteData", id, {
            headers: {
              Authentication: 'TEST'
            }
          })
            .subscribe((res: any) => {
              this.weatherArray = res
              this.router.navigateByUrl('/weather');
            })
        }
      }
    )
  }


}
