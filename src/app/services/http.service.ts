import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({providedIn:"root"})
export class HttpService{


  url : string = "http://localhost:5054/";
  constructor(private httpClient: HttpClient){}

  apiGetRequest(url: string) {
    return this.httpClient.get(url);
  }
  fetchIssuesAgainstFixVersion(fixVersion: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.get<any>(this.url + 'api/Issue/allIssues/' + fixVersion, { headers });
  }



}
