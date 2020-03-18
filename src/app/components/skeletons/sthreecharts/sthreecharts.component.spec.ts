import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SthreechartsComponent } from './sthreecharts.component';

describe('SthreechartsComponent', () => {
  let component: SthreechartsComponent;
  let fixture: ComponentFixture<SthreechartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SthreechartsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SthreechartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
