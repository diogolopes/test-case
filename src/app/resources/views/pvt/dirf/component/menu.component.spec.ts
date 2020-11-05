import { TestBed, async } from '@angular/core/testing';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'portal-legais-regulatorios-front'`, () => {
    const fixture = TestBed.createComponent(MenuComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('portal-legais-regulatorios-front');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('portal-legais-regulatorios-front app is running!');
  });
});
