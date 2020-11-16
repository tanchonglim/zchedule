import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentHomePagePage } from './student-home-page.page';

describe('StudentHomePagePage', () => {
  let component: StudentHomePagePage;
  let fixture: ComponentFixture<StudentHomePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentHomePagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentHomePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
