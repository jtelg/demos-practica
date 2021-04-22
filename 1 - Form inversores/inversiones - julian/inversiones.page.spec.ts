import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InversionesPage } from './inversiones.page';

describe('InversionesPage', () => {
  let component: InversionesPage;
  let fixture: ComponentFixture<InversionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InversionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InversionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
