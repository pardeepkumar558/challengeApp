import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GalleryComponent} from '../app/gallery/gallery.component';
import {ReportComponent} from '../app/report/report.component'

const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'report', component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
