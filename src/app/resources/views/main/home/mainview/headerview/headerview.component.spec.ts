import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderviewComponent } from './headerview.component';

describe('HeaderviewComponent', () => {
  let component: HeaderviewComponent;
  let fixture: ComponentFixture<HeaderviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
