import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTransitoComponent } from './historial-transito.component';

describe('HistorialTransitoComponent', () => {
  let component: HistorialTransitoComponent;
  let fixture: ComponentFixture<HistorialTransitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HistorialTransitoComponent]
    });
    fixture = TestBed.createComponent(HistorialTransitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
