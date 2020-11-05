import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeRendimentosComponent } from './informe-rendimentos.component';

describe('InformeRendimentosComponent', () => {
  let component: InformeRendimentosComponent;
  let fixture: ComponentFixture<InformeRendimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeRendimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeRendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
