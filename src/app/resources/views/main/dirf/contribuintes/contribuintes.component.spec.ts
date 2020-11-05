import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribuintesComponent } from './contribuintes.component';

describe('ContribuintesComponent', () => {
  let component: ContribuintesComponent;
  let fixture: ComponentFixture<ContribuintesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribuintesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribuintesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
