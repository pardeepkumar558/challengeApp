import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GalleryComponent} from '../app/gallery/gallery.component';
import {ReportComponent} from '../app/report/report.component';
import {CustomChartComponent} from '../app/custom-chart/custom-chart.component';

const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'report', component: CustomChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
