import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private  authenticationService:AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if(req.url!=="http://localhost:8448/register"){
      req = req.clone({
        setHeaders:{
          Authorization: `Bearer ${this.authenticationService.getToken()}`
        }
      })

    }
    return next.handle(req);
  }
}
