import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterPageComponent } from './admin-register-page.component';

describe('AdminRegisterPageComponent', () => {
  let component: AdminRegisterPageComponent;
  let fixture: ComponentFixture<AdminRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRegisterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
