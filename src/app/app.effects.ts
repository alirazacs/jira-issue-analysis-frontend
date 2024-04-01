import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpService } from "./services/http.service";
import { fetchError, postSourceDetails, setSourceDetails, setSourceDetailsLoadingState } from "./app.actions";
import { EMPTY, Observable, catchError, map, mergeMap, of } from "rxjs";
import { ApiUrls } from "./apiUrls";
import { SourceCredentials } from "./models/ProjectSource";
import { Action, Store } from "@ngrx/store";
import { AppState } from "./app-states";
import { ToastService } from "./services/toast.service";
import { LoadingState } from "./models/Issue";
@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private httpService: HttpService, private store: Store<AppState>, private toastService: ToastService) { }

  addSourceDetails$ = createEffect(() => this.actions$.pipe(
    ofType(postSourceDetails),
    mergeMap(action => this.postSourceDetails(action).pipe(map((res) => this.dispatchSourceDetails(res))))));

  postSourceDetails(action: any): Observable<SourceCredentials> {
    const url = ApiUrls.SOURCE_DETAILS;
    const params = action.sourceDetails;

    this.store.dispatch(setSourceDetailsLoadingState({ loadingState: LoadingState.LOADING }));
    return <any>this.httpService.apiPostRequest(url, params).pipe(catchError(error => {
      this.toastService.showToastMessage('error', 'Error!', error.error);
      this.store.dispatch(setSourceDetailsLoadingState({ loadingState: LoadingState.ERROR }));
      return of(undefined);
    }));
  }

  dispatchSourceDetails(response: SourceCredentials) {
    if (!response) {
      return fetchError();
    }

    this.store.dispatch(setSourceDetailsLoadingState({ loadingState: LoadingState.DONE }));
    this.toastService.showToastMessage('success', 'Success!', 'Added source details successfully');
    return setSourceDetails({ sourceDetails: response });
  }
}
