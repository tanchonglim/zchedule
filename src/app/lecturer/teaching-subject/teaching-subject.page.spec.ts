import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeachingSubjectPage } from './teaching-subject.page';

describe('TeachingSubjectPage', () => {
  let component: TeachingSubjectPage;
  let fixture: ComponentFixture<TeachingSubjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachingSubjectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeachingSubjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
