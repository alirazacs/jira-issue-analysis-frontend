import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IssueAnalysisComponent } from './issue-analysis/issue-analysis.component';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MenuComponent],
  providers:[],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jira-issue-analysis-frontend';
}
