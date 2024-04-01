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
import { NgxEchartsDirective } from 'ngx-echarts';
import { InputTextModule } from 'primeng/inputtext';
import { IssueAnalysisComponent } from './issue-analysis/issue-analysis.component';
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
      NgxEchartsDirective,
      InputTextModule
    ],
    bootstrap:[AppComponent]
})
export class AppModule { }
