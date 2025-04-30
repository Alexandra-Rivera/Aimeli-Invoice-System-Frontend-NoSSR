import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosTablaComponentComponent } from './productos-tabla-component.component';

describe('ProductosTablaComponentComponent', () => {
  let component: ProductosTablaComponentComponent;
  let fixture: ComponentFixture<ProductosTablaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosTablaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosTablaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
