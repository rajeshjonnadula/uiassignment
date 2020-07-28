import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerConditionComponent } from './container-condition.component';

describe('ContainerConditionComponent', () => {
  let component: ContainerConditionComponent;
  let fixture: ComponentFixture<ContainerConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
