import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSwimmersComponent } from './register-swimmers.component';

describe('RegisterSwimmersComponent', () => {
  let component: RegisterSwimmersComponent;
  let fixture: ComponentFixture<RegisterSwimmersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSwimmersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterSwimmersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
