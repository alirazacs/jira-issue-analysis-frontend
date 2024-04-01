import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpService } from "./services/http.service";
import { fetchError, fetchSourceProjects, postSourceDetails, setSourceDetails, setSourceDetailsLoadingState, setSourceProjects, setSourceProjectsLoadingState } from "./app.actions";
import { EMPTY, Observable, catchError, map, mergeMap, of } from "rxjs";
import { ApiUrls } from "./apiUrls";
import { SourceCredentials, SourceProject } from "./models/ProjectSource";
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


  sourceProjects$ = createEffect(() => this.actions$.pipe(
    ofType(fetchSourceProjects),
    mergeMap(action => this.fetchSourceProjects(action).pipe(map((res) => this.dispatchSourceProjects(res))))));

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

  fetchSourceProjects(action: any):Observable<SourceProject[]> {
    const url = ApiUrls.SOURCE_PROJECTS;
    this.store.dispatch(setSourceProjectsLoadingState({ loadingState: LoadingState.LOADING}));
    return <any>this.httpService.apiGetRequest(url).pipe(catchError(error => {
      this.toastService.showToastMessage('error', 'Error!', error.error);
      this.store.dispatch(setSourceProjectsLoadingState({ loadingState: LoadingState.ERROR }));
      return of(undefined);
    }));
  }

  dispatchSourceProjects(response: SourceProject[]) {
    if (!response) {
      return fetchError();
    }

    this.store.dispatch(setSourceProjectsLoadingState({ loadingState: LoadingState.DONE }));
    return setSourceProjects({ sourceProjects: response });
  }
}
