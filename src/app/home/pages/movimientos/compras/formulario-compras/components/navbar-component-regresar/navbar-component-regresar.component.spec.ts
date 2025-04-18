import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponentRegresarComponent } from './navbar-component-regresar.component';

describe('NavbarComponentRegresarComponent', () => {
  let component: NavbarComponentRegresarComponent;
  let fixture: ComponentFixture<NavbarComponentRegresarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponentRegresarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponentRegresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
