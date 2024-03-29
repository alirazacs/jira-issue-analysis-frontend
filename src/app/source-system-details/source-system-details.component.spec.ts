import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceSystemDetailsComponent } from './source-system-details.component';

describe('SourceSystemDetailsComponent', () => {
  let component: SourceSystemDetailsComponent;
  let fixture: ComponentFixture<SourceSystemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourceSystemDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SourceSystemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
