import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactUsComponent } from './admin-contact-us.component';

describe('AdminContactUsComponent', () => {
  let component: AdminContactUsComponent;
  let fixture: ComponentFixture<AdminContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContactUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
