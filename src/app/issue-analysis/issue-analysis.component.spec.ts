import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueAnalysisComponent } from './issue-analysis.component';

describe('IssueAnalysisComponent', () => {
  let component: IssueAnalysisComponent;
  let fixture: ComponentFixture<IssueAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssueAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
