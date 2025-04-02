import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonCuadradoComponent } from './boton-cuadrado.component';

describe('BotonCuadradoComponent', () => {
  let component: BotonCuadradoComponent;
  let fixture: ComponentFixture<BotonCuadradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonCuadradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonCuadradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
