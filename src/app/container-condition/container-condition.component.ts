import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as AppConstants from '../app.constants'
import { queryInput } from '../app.interface';

export interface NameValue {
  name: string;
  value: string;
}
@Component({
  selector: 'app-container-condition',
  templateUrl: './container-condition.component.html',
  styleUrls: ['./container-condition.component.css']
})
export class ContainerConditionComponent implements OnInit {

  types: NameValue[];
  subTypes: NameValue[];
  statuses: NameValue[];
  operationNames: NameValue[];
  operators: NameValue[];
  selectedType: string;
  selectedSubType: string;
  selectedStatus: string;
  selectedOperationName: string;
  selectedOperator: string;

  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() conditionValues: queryInput[];

  constructor() { }

  ngOnInit(): void {
    this.types = AppConstants.containerTypes;
    this.subTypes = AppConstants.containerSubTypes;
    this.statuses = AppConstants.containerStatuses;
    this.operationNames = AppConstants.containerOperationNames;
    this.operators = AppConstants.containerOperators;
  }

  onDelete(id) {
    this.delete.emit(id);
  }

  onAdd() {
    this.add.emit();
  }

  onValueChange(index?: number) {
    if(this.conditionValues[index].lookbackHour < 0) {
      this.conditionValues[index].lookbackHour = 0;
    }
    else if(this.conditionValues[index].lookbackHour > 9999) {
      this.conditionValues[index].lookbackHour = 9999;
    }
    else if(this.conditionValues[index].lookbackHour === 9999){
      this.conditionValues[index].lookbackMinute=0;
    }

    if(this.conditionValues[index].lookbackMinute <  0) {
      this.conditionValues[index].lookbackMinute = 0;
    }
    else if(this.conditionValues[index].lookbackMinute > 59) {
      this.conditionValues[index].lookbackMinute = 59;
    }
    this.valueChange.emit();
  }

}
