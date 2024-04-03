import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Issue, Release } from '../models/Issue';
import { EChartsOption } from 'echarts';
import { Table } from 'primeng/table';
import { AppState } from '../app-states';
import { Store } from '@ngrx/store';
import { fetchAllReleases, fetchReleasesIssues } from '../app.actions';
import { Subscription, combineLatest } from 'rxjs';
import { issueAnalysisLoadingState, selectIssues, selectReleases } from '../app.selector';
import { state } from '@angular/animations';

@Component({
  selector: 'app-issue-analysis',
  templateUrl: './issue-analysis.component.html',
  styleUrl: './issue-analysis.component.css'
})
export class IssueAnalysisComponent implements OnInit {
  issues: Issue[] = [];
  issueIds: string[] = [];
  timeSpentOnIssueIds: number[] = [];
  storyPointsOnIssue: number[] = [];
  chartOption: EChartsOption = {};
  chartOptionForRatio: EChartsOption = {};
  timeSpentToStoryPointsRatio: number[] = [];
  @ViewChild('dt1') dt: Table | undefined;
  subscription = new Subscription();
  releasesList: Release[] = [];
  selectedRelease: Release = {
    releaseDate: '',
    released: false,
    id: '',
    name: ''
  };
  showLoadingSpinner = false;
  storyPointsSeriesName: string = 'Story Points';


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.dispatch(fetchAllReleases());
    const selectReleases$ = this.store.pipe(selectReleases);
    const selectIssues$ = this.store.pipe(selectIssues);
    const loadingStates$ = this.store.pipe(issueAnalysisLoadingState);

    this.subscription.add(combineLatest([selectReleases$, selectIssues$, loadingStates$])
      .subscribe(([releases, issues, loadingState]) => {
        this.releasesList = releases;
        this.issues = [...issues];
        this.showLoadingSpinner = loadingState;
        this.prepareChartAndTableDate();
      }));
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  prepareChartAndTableDate() {
    this.issueIds = this.issues.map((issue: { id: any; }) => issue.id);
    this.timeSpentOnIssueIds = this.issues.map(issue => issue.issueEstimatedAndSpentTime.aggregatedTimeSpentInDays);
    this.storyPointsOnIssue = this.issues.map(issue => issue.storyPoints);
    this.timeSpentToStoryPointsRatio = this.issues.map(issue => issue.productivityRatio);
    this.populateChart();
    this.populateChartForRatio();
  }

  populateChart() {
    this.chartOption = {
      xAxis: {
        type: 'category',
        data: [...this.issueIds],
        axisLabel: { rotate: 90 },
      },
      yAxis: {
        type: 'value',
        name: "Time Spent + Story Points(days)",
        nameLocation: 'middle',
        nameGap: 40
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: (params: any) => {
          return this.getFormattedTooltipText(params);
        },
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: [
          "Time Spent",
          "Story Points"
        ],
      },
      series: [
        {
          name: "Time Spent",
          data: [...this.timeSpentOnIssueIds],
          itemStyle: { color: 'green' },
          type: 'bar',
        },
        {
          name: "Story Points",
          data: [...this.storyPointsOnIssue],
          itemStyle: { color: 'red' },
          type: 'bar',
        },
      ],
    };

  }

  populateChartForRatio() {
    this.chartOptionForRatio = {
      xAxis: {
        type: 'category',
        data: [...this.issueIds],
        axisLabel: { rotate: 90 },
      },
      yAxis: {
        type: 'value',
        name: "Time Spent / Story Points(ratio)",
        nameLocation: 'middle',
        nameGap: 40
      },

      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: (params: any) => {
          return this.getFormattedTooltipText(params);
        },
        axisPointer: {
          type: 'shadow'
        }
      },
      series: [
        {
          name: "Productivity",
          data: [...this.timeSpentToStoryPointsRatio],
          itemStyle: { color: (seriesIndex: any) => { return this.decideColorBasedOnRatio(seriesIndex) } },
          type: 'bar',
        },
      ],
    };


  }

  decideColorBasedOnRatio(index: any) {
    return index.value < 1 ? "red" : "green";
  }


  getFormattedTooltipText(params: any) {
    console.log(params);
    const issue = this.issues.find(issue => issue.id == params[0].name);
    const keyAndSummary = `${issue?.id} - ${this.getTruncatedName(issue?.summary)}`;
    var tooltip = '<div style="width:fit-content;white-space:normal;">' + keyAndSummary + "<br/>";

    for (var i = 0; i < params.length; i++) {
      tooltip += params[i].marker + params[i].seriesName + ": ";
      tooltip += this.getSeriesValue(params[i].value, params[i].seriesName) || "0";
      tooltip += "<br/>";
    }

    return tooltip + "</div>";
  }

  getSeriesValue(seriesValue: number, seriesName: string) {
    if (seriesName == this.storyPointsSeriesName) {
      return seriesValue;
    }
    return seriesValue.toFixed(2);
  }

  loadSelectedReleaseData() {
    this.store.dispatch(fetchReleasesIssues({ release: this.selectedRelease }));
  }

  getTruncatedName(issueName?: string) {
    if (!issueName) {
      return '';
    }
    if (issueName.length > 15) {
      return issueName.substr(0, 15) + '...';
    }
    return issueName;
  }
}
