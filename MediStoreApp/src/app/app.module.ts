import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { Interceptor } from './interceptors/interceptor';
import { MediaService } from './services/media.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GalleryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MediaService, { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
