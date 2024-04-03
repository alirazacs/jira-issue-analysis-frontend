import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Issue } from '../models/Issue';
import { EChartsOption } from 'echarts';
import { Table } from 'primeng/table';

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
  issuesFetched = false;
  chartOption: EChartsOption = {};
  chartOptionForRatio: EChartsOption = {};
  timeSpentToStoryPointsRatio: number[] = [];
  @ViewChild('dt1') dt: Table | undefined;



  constructor(private httpService: HttpService) { }

  ngOnInit(): void {

    this.httpService.fetchIssuesAgainstFixVersion("1.9.6.20").subscribe(data => {

      this.issues = data.issues;
      this.issueIds = this.issues.map((issue: { id: any; }) => issue.id);
      this.timeSpentOnIssueIds = this.issues.map(issue => issue.issueEstimatedAndSpentTime.aggregatedTimeSpentInDays);
      this.storyPointsOnIssue = this.issues.map(issue => issue.storyPoints);
      this.timeSpentToStoryPointsRatio = this.timeSpentOnIssueIds.map((ts, index) => {
        return ts > 0 ? this.storyPointsOnIssue[index] / ts : 0;
      });
      this.issuesFetched = true;
      this.populateChart();
      this.populateChartForRatio();

    });
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
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
    var tooltip = '<div style="width:fit-content;white-space:normal;">' + params[0].name + "<br/>";

    for (var i = 0; i < params.length; i++) {
      tooltip += params[i].marker + params[i].seriesName + ": ";
      tooltip += params[i].value || "0";
      tooltip += "<br/>";
    }

    return tooltip + "</div>";
  }
}
