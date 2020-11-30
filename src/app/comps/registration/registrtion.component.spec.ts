import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrtionComponent } from './registrtion.component';

describe('RegistrtionComponent', () => {
  let component: RegistrtionComponent;
  let fixture: ComponentFixture<RegistrtionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrtionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
