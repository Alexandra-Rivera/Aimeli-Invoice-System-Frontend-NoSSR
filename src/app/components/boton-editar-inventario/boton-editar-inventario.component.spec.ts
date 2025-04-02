import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonEditarInventarioComponent } from './boton-editar-inventario.component';

describe('BotonEditarInventarioComponent', () => {
  let component: BotonEditarInventarioComponent;
  let fixture: ComponentFixture<BotonEditarInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonEditarInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonEditarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
