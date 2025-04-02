import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonAgregarAlCarritoComponent } from './boton-agregar-al-carrito.component';

describe('BotonAgregarAlCarritoComponent', () => {
  let component: BotonAgregarAlCarritoComponent;
  let fixture: ComponentFixture<BotonAgregarAlCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonAgregarAlCarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonAgregarAlCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
