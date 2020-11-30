import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAPlayerComponent } from './add-a-player.component';

describe('AddAPlayerComponent', () => {
  let component: AddAPlayerComponent;
  let fixture: ComponentFixture<AddAPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
