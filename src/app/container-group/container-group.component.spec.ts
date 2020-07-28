import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerGroupComponent } from './container-group.component';

describe('ContainerGroupComponent', () => {
  let component: ContainerGroupComponent;
  let fixture: ComponentFixture<ContainerGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
