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
                   console.log(i%3);
                    if(i%3==0)
                    {
                        itm.Type="IMG";
                        itm.Url="../assets/images/a.jpeg";
                    }
                    else if(i%3==1)
                    {
                       
                        itm.Type="GIF";
                        itm.Url="../assets/images/c.gif";  
                       
                                    }
                    else if(i%3==2)
                    {
                        itm.Type="VIDEO";
                        itm.ThumbnailUrl="https://img.youtube.com/vi/1rYGCP52fG8/0.jpg"
                        itm.Url="https://www.youtube.com/embed/1rYGCP52fG8";
                    }

                   
                    this.items.push(itm);

                }
            return of(new HttpResponse({ status: 200, body: this.items }));
            
        }
        return next.handle(request);
    }
}