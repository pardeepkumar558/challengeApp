import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './interceptors/interceptor';
import { MediaService } from './services/media.service';
import { ModalComponent } from './modal/modal.component';
import * as Hammer from 'hammerjs'; 
import { HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {HammerConfigService} from '../app/hammer-config.service';
import {GalleriaModule} from 'primeng/galleria';
import { SafePipe } from './safe.pipe';
import { ReportComponent } from './report/report.component';
import {ChartModule} from 'primeng/chart';

@Injectable() 
export class MyHammerConfig extends HammerGestureConfig { 
  overrides = <any> { 
    swipe: { direction: Hammer.DIRECTION_ALL }, 
  }; 
} 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GalleryComponent,
    ModalComponent,
    SafePipe,
    ReportComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GalleriaModule,
    HammerModule,
    ChartModule
  
  ],
  providers: [MediaService, {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfigService
  }, { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
