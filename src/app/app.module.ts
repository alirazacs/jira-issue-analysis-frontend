import { SourceSystemDetailsComponent } from './source-system-details/source-system-details.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MenuComponent } from "./menu/menu.component";
import { RouterModule, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsDirective, NgxEchartsModule } from 'ngx-echarts';
import { InputTextModule } from 'primeng/inputtext';
import { IssueAnalysisComponent } from './issue-analysis/issue-analysis.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { sourceReducer } from './source.reducers';
import { AppState } from './app-states';
import { AppEffects } from './app.effects';
import { EffectsModule } from '@ngrx/effects';
const reducers : ActionReducerMap<AppState> = {
  sourceCredentials: sourceReducer
};

@NgModule({
    declarations: [
        AppComponent,
        SourceSystemDetailsComponent,
        IssueAnalysisComponent
    ],
    providers: [HttpService],
    imports: [
      BrowserModule,
      DropdownModule,
      StepperModule,
      MenuComponent,
      ButtonModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
      }),
      InputTextModule,
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([
        AppEffects
      ])
    ],
    bootstrap:[AppComponent]
})
export class AppModule { }


