import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubjectStudentFreeTimeComponent } from './subject-student-free-time.component';

describe('SubjectStudentFreeTimeComponent', () => {
  let component: SubjectStudentFreeTimeComponent;
  let fixture: ComponentFixture<SubjectStudentFreeTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectStudentFreeTimeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectStudentFreeTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
