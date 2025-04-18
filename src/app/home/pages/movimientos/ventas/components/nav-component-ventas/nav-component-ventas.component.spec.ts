import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponentVentasComponent } from './nav-component-ventas.component';

describe('NavComponentVentasComponent', () => {
  let component: NavComponentVentasComponent;
  let fixture: ComponentFixture<NavComponentVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponentVentasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponentVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
