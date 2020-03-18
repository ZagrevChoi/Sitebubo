import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScardComponent } from './scard.component';

describe('ScardComponent', () => {
  let component: ScardComponent;
  let fixture: ComponentFixture<ScardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
