import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisteredSubjectPage } from './registered-subject.page';

describe('RegisteredSubjectPage', () => {
  let component: RegisteredSubjectPage;
  let fixture: ComponentFixture<RegisteredSubjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredSubjectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisteredSubjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
