import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuviewComponent } from './menuview.component';

describe('MenuviewComponent', () => {
  let component: MenuviewComponent;
  let fixture: ComponentFixture<MenuviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
