import { Store } from '@ngrx/store';
import { AppState } from '../app-states';
import { SourceCredentials } from './../models/ProjectSource';
import { Component, OnInit } from '@angular/core';
import { postSourceDetails } from '../app.actions';
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

  customFieldsDrpdwnValues:any;
  cities: City[] | undefined;
  selectedCity: City | undefined;
  sourceCredentials: SourceCredentials ={
    Id : 0,
    SourceAuthToken:'',
    SourceUserEmail:'',
    SourceURL:''
  };
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {

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
  submitSourceDetails()
  {
    this.store.dispatch(postSourceDetails({sourceDetails: this.sourceCredentials}));
    console.log(this.sourceCredentials);
  }
}
