import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Modal2Component } from './modal2/modal2.component';
import { AddWeatherComponent } from './add-weather/add-weather.component';
import { FilterWeatherComponent } from './filter-weather/filter-weather.component';
import { EditWeatherComponent } from './edit-weather/edit-weather.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { PrimeNGComponent } from './prime-ng/prime-ng.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    ModalComponent,
    Modal2Component,
    AddWeatherComponent,
    FilterWeatherComponent,
    EditWeatherComponent,
    PrimeNGComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
