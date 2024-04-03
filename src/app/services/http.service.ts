import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, throwError } from "rxjs";
import { ApiUrls } from "../apiUrls";

@Injectable({providedIn:"root"})
export class HttpService{


  url : string = "http://localhost:5054/";
  constructor(private httpClient: HttpClient){}

  fetchIssuesAgainstFixVersion(fixVersion: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.get<any>(this.url + ApiUrls.RELEASE_ISSUES + fixVersion, { headers });
  }


  apiPostRequest(endPoint: string, requestParams:any) {
    if (!endPoint) return of({});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.url + endPoint, requestParams, {headers });
  }

  apiGetRequest(endPoint: string) {
    if (!endPoint) return of({});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get(this.url + endPoint, {headers });
  }



}
