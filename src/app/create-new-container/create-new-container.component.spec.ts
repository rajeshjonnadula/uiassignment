import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewContainerComponent } from './create-new-container.component';

describe('CreateNewContainerComponent', () => {
  let component: CreateNewContainerComponent;
  let fixture: ComponentFixture<CreateNewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
