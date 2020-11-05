import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacaoMovimentosComponent } from './importacao-movimentos.component';

describe('ImportacaoMovimentosComponent', () => {
  let component: ImportacaoMovimentosComponent;
  let fixture: ComponentFixture<ImportacaoMovimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportacaoMovimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportacaoMovimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
