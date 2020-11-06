import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class MenuService {

  private baseURL = 'http://172.30.64.66:3000/';  
  //private baseURL: string = "http://" + environment.APIKeys.hostMenuApi + ":" + environment.APIKeys.portMenuApi + "/";

  //private baseURL: string = "http://10.133.181.47:3000/";

  constructor(private http: HttpClient) {
  }

  getMenus(userId: string): Observable<any> {
    console.log(this.baseURL);
    return this.http.get(this.baseURL + 'menus/' + userId);
  }

}
