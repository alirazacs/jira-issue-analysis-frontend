import { Store } from '@ngrx/store';
import { AppState } from '../app-states';
import { CustomField, SourceCredentials, SourceFieldsResponse, SourceProject } from './../models/ProjectSource';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { fetchSourceDetails, fetchSourceProjectsAndCustomFields, postSourceDetails, setSourceDetailsLoadingState } from '../app.actions';
import { MessageService } from 'primeng/api';
import { validateEmail, validateUrl } from '../services/helper-function';
import { ToastService } from '../services/toast.service';
import { LoadingState } from '../models/Issue';
import { selectLoadingStates, selectSourceCredentials, selectSourceProjects } from '../loading-states.selector';
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
  selectedProject: SourceProject | undefined;
  sourceCredentials: SourceCredentials = {
    id: 0,
    sourceAuthToken: '',
    sourceUserEmail: '',
    sourceURL: ''
  };

  nextCallBackEvent: EventEmitter<any> | undefined;
  constructor(private store: Store<AppState>, private toastService: ToastService) { }

  ngOnInit(): void {

    const loadingStates$ = this.store.pipe(selectLoadingStates);
    const sourceProjects$ = this.store.pipe(selectSourceProjects);
    const sourceCredentials$ = this.store.pipe(selectSourceCredentials);
    this.store.dispatch(fetchSourceDetails());

    this.subscription.add(combineLatest([sourceProjects$, sourceCredentials$])
    .subscribe(([sourceFields, sourceCredentials])=>{
      this.sourceFields = sourceFields;
      this.sourceCredentials = sourceCredentials;
    }))

    this.subscription.add(loadingStates$.subscribe(loadingState => {
      if (loadingState.saveCredetialsLoadingState == LoadingState.DONE) {
        this.store.dispatch(fetchSourceProjectsAndCustomFields());
        this.navigateToNextStep();
      }
    }));


    this.store.dispatch(fetchSourceProjectsAndCustomFields());

    this.customFieldsDrpdwnValues = [
      {
        id: 1,
        name: "Vitara Brezza",
        val: "VITARA"
      },
      {
        id: 2,
        name: "Mahindra Thar",
        val: "THAR"
      },
    ]
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

}
