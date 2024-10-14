import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRecoverPasswordComponent } from './header-recover-password.component';

describe('HeaderRecoverPasswordComponent', () => {
  let component: HeaderRecoverPasswordComponent;
  let fixture: ComponentFixture<HeaderRecoverPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderRecoverPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderRecoverPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
