import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Item } from '../models/item';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable()
export class Interceptor implements HttpInterceptor {
    items: Item[];
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
        if (request.method === "GET" && request.url.includes("GetItems")) {
            this.items=[];
               for(var i=0;i<100;i++)
                {
                    let itm=new Item();
                    itm.Id=i;
                    itm.ThumbnailUrl="";
                    itm.Type="Temp";
                    itm.Url="../assets/images/a.jpeg";
                    this.items.push(itm);

                }
            return of(new HttpResponse({ status: 200, body: this.items }));
            
        }
        return next.handle(request);
    }
}