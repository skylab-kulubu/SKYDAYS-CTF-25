import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPageComponent } from './student-page.component';

describe('StudentPageComponent', () => {
  let component: StudentPageComponent;
  let fixture: ComponentFixture<StudentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
