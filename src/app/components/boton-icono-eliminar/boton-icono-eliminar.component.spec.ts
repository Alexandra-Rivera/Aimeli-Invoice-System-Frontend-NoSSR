import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonIconoEliminarComponent } from './boton-icono-eliminar.component';

describe('BotonIconoEliminarComponent', () => {
  let component: BotonIconoEliminarComponent;
  let fixture: ComponentFixture<BotonIconoEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonIconoEliminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonIconoEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
