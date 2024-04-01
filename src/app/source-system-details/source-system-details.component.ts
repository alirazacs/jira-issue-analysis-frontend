import { Store } from '@ngrx/store';
import { AppState } from '../app-states';
import { SourceCredentials } from './../models/ProjectSource';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { postSourceDetails, setSourceDetailsLoadingState } from '../app.actions';
import { MessageService } from 'primeng/api';
import { validateEmail, validateUrl } from '../services/helper-function';
import { ToastService } from '../services/toast.service';
import { LoadingState } from '../models/Issue';
import { selectLoadingStates } from '../loading-states.selector';
import { Subscription } from 'rxjs';
import { Stepper } from 'primeng/stepper';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-source-system-details',
  templateUrl: './source-system-details.component.html',
  styleUrl: './source-system-details.component.css'
})
export class SourceSystemDetailsComponent implements OnInit {

  selectedCustomField: string = "abc";
  subscription = new Subscription();
  customFieldsDrpdwnValues: any;
  cities: City[] | undefined;
  selectedCity: City | undefined;
  sourceCredentials: SourceCredentials = {
    Id: 0,
    SourceAuthToken: '',
    SourceUserEmail: '',
    SourceURL: ''
  };

  nextCallBackEvent: EventEmitter<any> | undefined;
  constructor(private store: Store<AppState>, private toastService: ToastService) { }

  ngOnInit(): void {

    const loadingStates$ = this.store.pipe(selectLoadingStates);
    this.subscription.add(loadingStates$.subscribe(loadingState => {
      if (loadingState.saveCredetialsLoadingState == LoadingState.DONE) {
        this.navigateToNextStep();
      }
    }));

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
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
    if (!validateEmail(this.sourceCredentials.SourceUserEmail)) {
      this.toastService.showToastMessage('error', 'Error!', 'Invalid User Email');
      return;
    }
    else if (!validateUrl(this.sourceCredentials.SourceURL)) {
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
}
