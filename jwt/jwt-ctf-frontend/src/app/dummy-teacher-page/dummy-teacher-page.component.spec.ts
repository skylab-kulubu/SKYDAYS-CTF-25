import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyTeacherPageComponent } from './dummy-teacher-page.component';

describe('DummyTeacherPageComponent', () => {
  let component: DummyTeacherPageComponent;
  let fixture: ComponentFixture<DummyTeacherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyTeacherPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyTeacherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
