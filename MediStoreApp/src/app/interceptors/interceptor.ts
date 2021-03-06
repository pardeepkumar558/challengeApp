import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Item } from '../models/item';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { environment } from '../../environments/environment';
import * as data from '../../assets/data/data.json';

@Injectable()
export class Interceptor implements HttpInterceptor {
    items: Item[];
    videosUrls: string[] = ["eg2g6FPsdLI", "H9JlOwA-zO8", "XUv7Z9DMtLA", "HccqokXN2n8", "gRIx7ByM-Fs", "o-7fsuJtEhk", "XbqfQPiQdAU", "w9oRl9ppKFU", "HP1pMW5MKYY"];
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.method === "GET" && request.url.includes("GetItems")) {
            this.items = [];
            for (var i = 0; i < 100; i++) {
                let itm = new Item();
                itm.Id = i;
                itm.ThumbnailUrl = "";
                console.log(i % 3);


                this.items.push(this.setData(itm));

            }
            return of(new HttpResponse({ status: 200, body: this.items }));

        }
        else if(request.method === "GET" && request.url.includes("GetBusinessData"))
        {
            return of(new HttpResponse({ status: 200, body: data }));
        }
        return next.handle(request);
    }
    setData(itm: Item) {
        var i = Math.floor((Math.random() * 100) + 1) % 3;
        if (i == 0) {
            itm.Type = "VIDEO";
            itm.ThumbnailUrl = "https://img.youtube.com/vi/" + this.videosUrls[(Math.floor((Math.random() * 30) + 1) % 8)] + "/0.jpg";
            itm.Url = "https://www.youtube.com/embed/" + this.videosUrls[(Math.floor((Math.random() * 30) + 1) % 8)];
        }
        else if (i == 1) {


            itm.Type = "GIF";
            if (environment.production) {
                itm.Url = "../challenge/assets/images/" + (Math.floor((Math.random() * 30) + 1) % 5) + ".gif";

            }
            else {
                itm.Url = "../assets/images/" + (Math.floor((Math.random() * 30) + 1) % 5) + ".gif";
            }


        }
        else {
            itm.Type = "IMG";
            if (environment.production) {
                itm.Url = "../challenge/assets/images/" + (Math.floor((Math.random() * 30) + 1) % 12) + ".jpg";

                
            }
            else {
                itm.Url = "../assets/images/" + (Math.floor((Math.random() * 30) + 1) % 12) + ".jpg";
            }
        }
        return itm;
    }
}