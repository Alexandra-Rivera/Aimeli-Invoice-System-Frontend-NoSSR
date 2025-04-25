import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInfoAmeliComponent } from './formulario-info-ameli.component';

describe('FormularioInfoAmeliComponent', () => {
  let component: FormularioInfoAmeliComponent;
  let fixture: ComponentFixture<FormularioInfoAmeliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioInfoAmeliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioInfoAmeliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
