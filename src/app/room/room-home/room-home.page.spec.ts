import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomHomePage } from './room-home.page';

describe('RoomHomePage', () => {
  let component: RoomHomePage;
  let fixture: ComponentFixture<RoomHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
