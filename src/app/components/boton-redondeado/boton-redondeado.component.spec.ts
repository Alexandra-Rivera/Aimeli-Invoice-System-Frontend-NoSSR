import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonRedondeadoComponent } from './boton-redondeado.component';

describe('BotonRedondeadoComponent', () => {
  let component: BotonRedondeadoComponent;
  let fixture: ComponentFixture<BotonRedondeadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonRedondeadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonRedondeadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
