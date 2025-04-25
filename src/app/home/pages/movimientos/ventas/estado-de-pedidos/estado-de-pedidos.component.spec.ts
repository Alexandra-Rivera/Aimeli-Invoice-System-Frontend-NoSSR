import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoDePedidosComponent } from './estado-de-pedidos.component';

describe('EstadoDePedidosComponent', () => {
  let component: EstadoDePedidosComponent;
  let fixture: ComponentFixture<EstadoDePedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoDePedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoDePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
