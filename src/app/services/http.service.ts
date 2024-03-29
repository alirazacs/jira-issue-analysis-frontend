import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn:"root"})
export class HttpService{


  url : string = "https://localhost:7044/";
  constructor(private httpClient: HttpClient){}

  apiGetRequest(url: string) {
    return this.httpClient.get(url);
  }

  fetchIssuesAgainstFixVersion():Observable<any>{
   return this.httpClient.get<any>(this.url+"1.9.6.20");  
  }

}