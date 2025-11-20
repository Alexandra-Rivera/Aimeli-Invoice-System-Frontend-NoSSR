import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaRegistroComprasComponent } from './vista-registro-compras.component';

describe('VistaRegistroComprasComponent', () => {
  let component: VistaRegistroComprasComponent;
  let fixture: ComponentFixture<VistaRegistroComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaRegistroComprasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaRegistroComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
