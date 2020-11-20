import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubjectHomePage } from './subject-home.page';

describe('SubjectHomePage', () => {
  let component: SubjectHomePage;
  let fixture: ComponentFixture<SubjectHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
