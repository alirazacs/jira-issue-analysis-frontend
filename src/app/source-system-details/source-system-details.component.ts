import { Store } from '@ngrx/store';
import { AppState } from '../app-states';
import { CustomField, SourceCredentials, SourceFieldsResponse, SourceProject } from './../models/ProjectSource';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { fetchSourceDetails, fetchSourceProjectsAndCustomFields, postSourceDetails, postSourceProjectsAndCustomFields, setSourceDetailsLoadingState } from '../app.actions';
import { MessageService } from 'primeng/api';
import { validateEmail, validateUrl } from '../services/helper-function';
import { ToastService } from '../services/toast.service';
import { LoadingState } from '../models/Issue';
import { selectIsSourceConfigured, selectLoadingStates, selectSourceCredentials, selectSourceProjects } from '../app.selector';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-source-system-details',
  templateUrl: './source-system-details.component.html',
  styleUrl: './source-system-details.component.css'
})
export class SourceSystemDetailsComponent implements OnInit {

  selectedCustomField: string = "abc";
  subscription = new Subscription();
  customFieldsDrpdwnValues: any;
  sourceFields: SourceFieldsResponse = {
    sourceCustomFields: [],
    teamBoardCustomField: undefined,
    storyPointsCustomField: undefined,
    sourceProjects: [],
    userProject: undefined
  };
  savedSourceFields : SourceFieldsResponse = this.sourceFields;
  selectedProject: SourceProject | undefined;
  sourceCredentials: SourceCredentials = {
    id: 0,
    sourceAuthToken: '',
    sourceUserEmail: '',
    sourceURL: ''
  };
  isSourceConfigured: boolean = false;

  nextCallBackEvent: EventEmitter<any> | undefined;
  constructor(private store: Store<AppState>, private toastService: ToastService) { }

  ngOnInit(): void {

    const loadingStates$ = this.store.pipe(selectLoadingStates);
    const sourceProjects$ = this.store.pipe(selectSourceProjects);
    const sourceCredentials$ = this.store.pipe(selectSourceCredentials);
    const isSourceConfigured$ = this.store.pipe(selectIsSourceConfigured);

    this.store.dispatch(fetchSourceDetails());


    this.subscription.add(combineLatest([sourceProjects$, sourceCredentials$, isSourceConfigured$])
    .subscribe(([sourceFields, sourceCredentials, isSourceConfigured])=>{
      this.sourceFields = {...sourceFields};
      this.sourceCredentials = {...sourceCredentials};
      this.isSourceConfigured = isSourceConfigured;
      this.savedSourceFields = sourceFields;
    }));

    this.subscription.add(loadingStates$.subscribe(loadingState => {
      if (loadingState.saveCredetialsLoadingState == LoadingState.DONE) {
        this.store.dispatch(fetchSourceProjectsAndCustomFields());
        this.navigateToNextStep();
      }
    }));
  }

  submitSourceDetails(nextCallback: EventEmitter<any>) {
    if (!validateEmail(this.sourceCredentials.sourceUserEmail)) {
      this.toastService.showToastMessage('error', 'Error!', 'Invalid User Email');
      return;
    }
    else if (!validateUrl(this.sourceCredentials.sourceURL)) {
      this.toastService.showToastMessage('error', 'Error!', 'Invalid Source URL');
      return;
    }
    this.nextCallBackEvent = nextCallback;
    this.store.dispatch(postSourceDetails({ sourceDetails: this.sourceCredentials }));
  }

  navigateToNextStep() {
    if (this.nextCallBackEvent) {
      this.nextCallBackEvent.emit();
    }
  }

  filterCustomFields(customFields: CustomField[], otherCustomField?: CustomField) : CustomField[] {
    if (!otherCustomField) {
      return customFields;
    }
    return customFields.filter(customField => customField.customFieldValue !== otherCustomField.customFieldValue);
  }

  isSourceDetailsChanged() {
    return this.savedSourceFields.sourceProjects == this.sourceFields.sourceProjects &&
      this.savedSourceFields.storyPointsCustomField == this.sourceFields.storyPointsCustomField &&
      this.savedSourceFields.teamBoardCustomField == this.sourceFields.teamBoardCustomField && this.sourceFields.userProject !== null;
  }

  submitSourceFields() {
    this.store.dispatch(postSourceProjectsAndCustomFields({ sourceFields: this.sourceFields }));
  }

  goToNextPage(event: EventEmitter<any>) {
    this.store.dispatch(fetchSourceProjectsAndCustomFields());
    event.emit();
  }

}
