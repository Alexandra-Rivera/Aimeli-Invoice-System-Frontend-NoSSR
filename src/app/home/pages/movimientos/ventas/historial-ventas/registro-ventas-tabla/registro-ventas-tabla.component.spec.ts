import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVentasTablaComponent } from './registro-ventas-tabla.component';

describe('RegistroVentasTablaComponent', () => {
  let component: RegistroVentasTablaComponent;
  let fixture: ComponentFixture<RegistroVentasTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroVentasTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroVentasTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
