import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _httpClient: HttpClient) {}

  baseUrl = `http://176.9.184.190`;

  getAllSeafarers(): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}/api/MarineServices/GetAllSeafarers?Direction=ltr&InCT`
    );
  }

  AddNew(data: any): Observable<any> {
    return this._httpClient.post(
      `${this.baseUrl}/api/MarineServices/SaveSeafarer?InCT`,
      data
    );
  }

  FillEmployee(): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}/api/POS/FillEmployee?Id=0&text=&Direction=ltr&InCT`
    );
  }
  FillVendor(): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}/api/LegalAffairs/FillVendor?Id=0&text=&Direction=ltr&InCT`
    );
  }

  editData(data:any):Observable<any>{
    return this._httpClient.post(`${this.baseUrl}/api/MarineServices/SaveSeafarer?InCT`,data)
  }
statusSeafarer(Id: number, Status: number, EmpId: number): Observable<any> {
  const body = {};
  const url = `${this.baseUrl}/api/MarineServices/ActivateAndInActivateSeafarer?Id=${Id}&InCT&Status=${Status}&EmpId=${EmpId}`;
  return this._httpClient.post(url, body);
}


}
