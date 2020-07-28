import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContainerDialogComponent } from './create-container-dialog.component';

describe('CreateContainerDialogComponent', () => {
  let component: CreateContainerDialogComponent;
  let fixture: ComponentFixture<CreateContainerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContainerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContainerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
