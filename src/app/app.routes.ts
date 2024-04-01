import { RouterModule, Routes } from '@angular/router';
import { IssueAnalysisComponent } from './issue-analysis/issue-analysis.component';
import { SourceSystemDetailsComponent } from './source-system-details/source-system-details.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: "", redirectTo: "/source-details", pathMatch: "full"
  },
  { path: "source-details", component: SourceSystemDetailsComponent },
  { path: "issue-analysis", component: IssueAnalysisComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
