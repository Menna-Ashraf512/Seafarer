import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  baseUrl=`https://176.9.184.190`;

  login(data:any):Observable<any>{
    return this._http.post(`${this.baseUrl}/token`,data)
  }

  
}
