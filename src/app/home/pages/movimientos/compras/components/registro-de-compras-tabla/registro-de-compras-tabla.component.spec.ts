import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeComprasTablaComponent } from './registro-de-compras-tabla.component';

describe('RegistroDeComprasTablaComponent', () => {
  let component: RegistroDeComprasTablaComponent;
  let fixture: ComponentFixture<RegistroDeComprasTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDeComprasTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDeComprasTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
