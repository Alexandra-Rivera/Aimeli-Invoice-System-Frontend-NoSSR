import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComprasComponent } from './formulario-compras.component';

describe('FormularioComprasComponent', () => {
  let component: FormularioComprasComponent;
  let fixture: ComponentFixture<FormularioComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioComprasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
