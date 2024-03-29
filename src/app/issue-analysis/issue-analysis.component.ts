import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-issue-analysis',
  standalone: true,
  imports: [CommonModule, InputTextModule],
  templateUrl: './issue-analysis.component.html',
  styleUrl: './issue-analysis.component.css'
})
export class IssueAnalysisComponent implements OnInit {

  issues = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {

    this.httpService.fetchIssuesAgainstFixVersion().subscribe(data => {
      this.issues = data;
    });
  }


}
