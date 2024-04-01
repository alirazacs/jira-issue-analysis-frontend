import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpService } from "./services/http.service";
import { fetchError, postSourceDetails, setSourceDetails } from "./app.actions";
import { EMPTY, Observable, catchError, map, mergeMap, of } from "rxjs";
import { ApiUrls } from "./apiUrls";
import { SourceCredentials } from "./models/ProjectSource";
import { Action, Store } from "@ngrx/store";
import { AppState } from "./app-states";
@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private httpService: HttpService, private store: Store<AppState>) { }

  addSourceDetails$ = createEffect(() => this.actions$.pipe(
    ofType(postSourceDetails),
    mergeMap(action => this.postSourceDetails(action).pipe(map((res)=>this.dispatchSourceDetails(res))))));

  postSourceDetails(action: any): Observable<SourceCredentials> {
    const url = ApiUrls.SOURCE_DETAILS;
    const params = action.sourceDetails;
    return <any>this.httpService.apiPostRequest(url, params).pipe(catchError(error => {
      console.log(error);
      return of(this.store.dispatch(fetchError()));
    }));
  }

  dispatchSourceDetails(response:SourceCredentials){
    if(!response)
    {
      return fetchError();
    }
    return setSourceDetails({sourceDetails :response});
  }
}
