import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpService } from "./services/http.service";
import * as actions from './app.actions';
import { EMPTY, Observable, catchError, map, mergeMap, of } from "rxjs";
import { ApiUrls } from "./apiUrls";
import { SourceCredentials, SourceFieldsResponse, SourceProject } from "./models/ProjectSource";
import { Action, Store } from "@ngrx/store";
import { AppState } from "./app-states";
import { ToastService } from "./services/toast.service";
import { IssueSummary, LoadingState, Release } from "./models/Issue";
@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private httpService: HttpService, private store: Store<AppState>, private toastService: ToastService) { }

  addSourceDetails$ = createEffect(() => this.actions$.pipe(
    ofType(actions.postSourceDetails),
    mergeMap(action => this.postSourceDetails(action).pipe(map((res) => this.dispatchSourceDetails(res))))));

  fetchSourceDetails$ = createEffect(() => this.actions$.pipe(
    ofType(actions.fetchSourceDetails),
    mergeMap(action => this.fetchSourceDetails(action).pipe(map((res) => this.dispatchFetchedSourceDetails(res))))));


  sourceProjects$ = createEffect(() => this.actions$.pipe(
    ofType(actions.fetchSourceProjectsAndCustomFields),
    mergeMap(action => this.fetchSourceProjects(action).pipe(map((res) => this.dispatchSourceProjects(res))))));

  addSourceProjectsAndCustomFields$ = createEffect(() => this.actions$.pipe(
      ofType(actions.postSourceProjectsAndCustomFields),
      mergeMap(action => this.addSourceProjectsAndCustomFields(action).pipe(map((res) => this.dispatchSourceProjectsAndCustomFields(res))))));

  fetchAllReleases$ = createEffect(() => this.actions$.pipe(
        ofType(actions.fetchAllReleases),
        mergeMap(action => this.fetchAllReleases(action).pipe(map((res) => this.dispatchAllReleases(res))))));

  fetchReleaseIssues$ = createEffect(() => this.actions$.pipe(
          ofType(actions.fetchReleasesIssues),
          mergeMap(action => this.fetchReleaseIssues(action).pipe(map((res) => this.dispatchReleaseIssues(res))))));


  postSourceDetails(action: any): Observable<SourceCredentials> {
    const url = ApiUrls.SOURCE_DETAILS;
    const params = action.sourceDetails;

    this.store.dispatch(actions.setSourceDetailsLoadingState({ loadingState: LoadingState.LOADING }));
    return <any>this.httpService.apiPostRequest(url, params).pipe(catchError(error => {
      this.toastService.showToastMessage('error', 'Error!', error.error);
      this.store.dispatch(actions.setSourceDetailsLoadingState({ loadingState: LoadingState.ERROR }));
      return of(undefined);
    }));
  }

  fetchSourceDetails(action: any): Observable<SourceCredentials> {
    const url = ApiUrls.SOURCE_DETAILS;

    this.store.dispatch(actions.setFetchSourceDetailsLoadingState({ loadingState: LoadingState.LOADING }));
    return <any>this.httpService.apiGetRequest(url).pipe(catchError(error => {
      this.toastService.showToastMessage('error', 'Error!', error.error);
      this.store.dispatch(actions.setFetchSourceDetailsLoadingState({ loadingState: LoadingState.ERROR }));
      return of(undefined);
    }));
  }



  dispatchSourceDetails(response: SourceCredentials) {
    if (!response) {
      return actions.fetchError();
    }

    this.store.dispatch(actions.setSourceDetailsLoadingState({ loadingState: LoadingState.DONE }));
    this.toastService.showToastMessage('success', 'Success!', 'Added source details successfully');
    return actions.setSourceDetails({ sourceDetails: response });
  }

  dispatchFetchedSourceDetails(response: SourceCredentials) {
    if (!response) {
      return actions.fetchError();
    }

    this.store.dispatch(actions.setFetchSourceDetailsLoadingState({ loadingState: LoadingState.DONE }));
    return actions.setSourceDetails({ sourceDetails: response });
  }

  fetchSourceProjects(action: any):Observable<SourceFieldsResponse> {
    const url = ApiUrls.SOURCE_PROJECTS_AND_CUSTOM_FIELD;
    this.store.dispatch(actions.setSourceProjectsLoadingState({ loadingState: LoadingState.LOADING}));
    return <any>this.httpService.apiGetRequest(url).pipe(catchError(error => {
      this.toastService.showToastMessage('error', 'Error!', error.error);
      this.store.dispatch(actions.setSourceProjectsLoadingState({ loadingState: LoadingState.ERROR }));
      return of(undefined);
    }));
  }

  dispatchSourceProjects(response: SourceFieldsResponse) {
    if (!response) {
      return actions.fetchError();
    }

    this.store.dispatch(actions.setSourceProjectsLoadingState({ loadingState: LoadingState.DONE }));
    return actions.setSourceProjectsAndCustomFields({ sourceFields: response });
  }

  addSourceProjectsAndCustomFields(action:any):Observable<SourceFieldsResponse>{
    const url = ApiUrls.SOURCE_PROJECTS_AND_CUSTOM_FIELD;
    const payload = action.sourceFields;
    this.store.dispatch(actions.setSourceProjectsAndCustomFieldsLoadingState({ loadingState: LoadingState.LOADING}));

    return <any>this.httpService.apiPostRequest(url, payload).pipe(catchError(error => {
      this.toastService.showToastMessage('error', 'Error!', error.error);
      this.store.dispatch(actions.setSourceProjectsAndCustomFieldsLoadingState({ loadingState: LoadingState.ERROR }));
      return of(undefined);
    }));
  }

  dispatchSourceProjectsAndCustomFields(response: SourceFieldsResponse) {
    if (!response) {
      return actions.fetchError();
    }

    this.toastService.showToastMessage('success', 'Success!', 'Source custom fields & projects updated successfully');
    this.store.dispatch(actions.setSourceProjectsAndCustomFieldsLoadingState({ loadingState: LoadingState.DONE }));
    return actions.setSourceProjectsAndCustomFields({ sourceFields: response });
  }

  fetchAllReleases(action:any):Observable<Release[]>{
    const url = ApiUrls.ALL_RELEASES;
    this.store.dispatch(actions.setAllFetchReleasesLoadingState({ loadingState: LoadingState.LOADING}));
    return <any>this.httpService.apiGetRequest(url).pipe(catchError(error => {
      this.toastService.showToastMessage('error', 'Error!', error.error);
      this.store.dispatch(actions.setAllFetchReleasesLoadingState({ loadingState: LoadingState.ERROR }));
      return of(undefined);
    }));
  }


  dispatchAllReleases(response: Release[]) {
    if (!response) {
      return actions.fetchError();
    }

    this.store.dispatch(actions.setAllFetchReleasesLoadingState({ loadingState: LoadingState.DONE }));
    return actions.setAllReleases({ releases: response });
  }

  fetchReleaseIssues(action:any):Observable<IssueSummary>{
    const url = ApiUrls.RELEASE_ISSUES + action.release.name;
    this.store.dispatch(actions.fetchReleaseIssuesLoadingState({ loadingState: LoadingState.LOADING}));
    return <any>this.httpService.apiGetRequest(url).pipe(catchError(error => {
      this.toastService.showToastMessage('error', 'Error!', error.error);
      this.store.dispatch(actions.fetchReleaseIssuesLoadingState({ loadingState: LoadingState.ERROR }));
      return of(undefined);
    }));
  }

  dispatchReleaseIssues(response: IssueSummary) {
    if (!response) {
      return actions.fetchError();
    }

    this.store.dispatch(actions.setAllFetchReleasesLoadingState({ loadingState: LoadingState.DONE }));
    return actions.setReleaseIssues({ releaseIssues: response.issues });
  }
}
