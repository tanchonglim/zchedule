import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LecturerHomePagePage } from './lecturer-home-page.page';

describe('LecturerHomePagePage', () => {
  let component: LecturerHomePagePage;
  let fixture: ComponentFixture<LecturerHomePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerHomePagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LecturerHomePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
