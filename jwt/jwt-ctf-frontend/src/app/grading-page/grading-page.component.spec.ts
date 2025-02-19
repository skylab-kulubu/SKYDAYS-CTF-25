import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingPageComponent } from './grading-page.component';

describe('GradingPageComponent', () => {
  let component: GradingPageComponent;
  let fixture: ComponentFixture<GradingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
