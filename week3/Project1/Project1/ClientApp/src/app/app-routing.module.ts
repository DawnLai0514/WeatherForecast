import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather/weather.component';
import { RouterModule, Routes } from '@angular/router';
import { AddWeatherComponent } from './add-weather/add-weather.component';
import { FilterWeatherComponent } from './filter-weather/filter-weather.component';
import { EditWeatherComponent } from './edit-weather/edit-weather.component';
import { PrimeNGComponent } from './prime-ng/prime-ng.component';

const routes: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  { path: 'weather', component: WeatherComponent },
  { path: 'add', component: AddWeatherComponent },
  { path: 'filter/:summary', component: FilterWeatherComponent },
  { path: 'edit/:id/:date/:tem/:summary', component: EditWeatherComponent },
  { path: 'prime', component: PrimeNGComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
