import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncomendistasComponent } from './encomendistas.component';

describe('EncomendistasComponent', () => {
  let component: EncomendistasComponent;
  let fixture: ComponentFixture<EncomendistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncomendistasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncomendistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
