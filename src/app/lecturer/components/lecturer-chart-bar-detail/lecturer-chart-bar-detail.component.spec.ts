import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LecturerChartBarDetailComponent } from './lecturer-chart-bar-detail.component';

describe('LecturerChartBarDetailComponent', () => {
  let component: LecturerChartBarDetailComponent;
  let fixture: ComponentFixture<LecturerChartBarDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerChartBarDetailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LecturerChartBarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
