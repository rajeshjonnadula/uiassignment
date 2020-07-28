import { Injectable } from '@angular/core';
import { queryInput, queryGroupLinkedList, queryString } from './app.interface';
import * as AppConstants from './app.constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  queryContentsLinkedList: queryGroupLinkedList;
  idIndex = 1;
  queryContentChange: Subject<queryGroupLinkedList> = new Subject<queryGroupLinkedList>();
  queryStringChange: Subject<queryString> = new Subject<queryString>();
  queryString: queryString;
  appendedString: queryString = {};

  constructor() {
    const index = this.generateIdfromIndex();
    this.queryContentsLinkedList = {
      [index]: {
        inputValues: [],
        parentId: null,
        childIds: [],
        isAnd: true
      }
    }

    this.queryString = {
      [index]: ''
    };

  }

  generateIdfromIndex() {
    const id = 'linked_list_' + this.idIndex;
    this.idIndex++;
    return id;
  }

  getDefaultGroupContentLinkedList(parentId: string) {
    return {
        inputValues: [],
        parentId: parentId,
        childIds: [],
        isAnd: true
    }
  }

  getDefaultInputContent() {
    this.idIndex++;
    const inputContent: queryInput = {
      id: this.generateIdfromIndex(),
      type: AppConstants.containerTypes[0].value,
      subType: AppConstants.containerSubTypes[0].value,
      status: AppConstants.containerStatuses[0].value,
      operationName: AppConstants.containerOperationNames[0].value,
      operator: AppConstants.containerOperators[0].value,
      value: '0',
      lookbackHour: 0,
      lookbackMinute: 0
    }
    return inputContent;
  }

  getQueryContentsLinkedList() {
    return this.queryContentsLinkedList;
  }

  addInputValuesLinkedList(parentId: string) {
    this.queryContentsLinkedList[parentId].inputValues.push(this.getDefaultInputContent());
    this.queryContentChange.next(this.queryContentsLinkedList);
    this.callCreateQueryString(parentId);
  }

  deleteInputValueById(parentId: string, id: string) {
    const inputValues = this.queryContentsLinkedList[parentId].inputValues;
    inputValues.forEach(inputValue => {
      if(inputValue.id === id) {
        const index = inputValues.indexOf(inputValue);
        inputValues.splice(index, 1);
      }
    });
    this.queryContentChange.next(this.queryContentsLinkedList);
    this.callCreateQueryString(parentId);
  }

  addGroupLinkedList(parentId: string) {
    const id = this.generateIdfromIndex();
    this.queryContentsLinkedList[id] = this.getDefaultGroupContentLinkedList(parentId);
    this.queryContentsLinkedList[parentId].childIds.push(id);
    this.queryContentChange.next(this.queryContentsLinkedList);
    this.queryString[id] = '';
  }

  deleteGroup(id: string) {
    const childIds = this.queryContentsLinkedList[id].childIds;
    const parentId = this.queryContentsLinkedList[id].parentId;
    if(childIds.length > 0) {
      childIds.forEach(childId => {
        this.deleteGroup(childId);
      })
    }
    if (parentId !== null) {
      const childrenIds = this.queryContentsLinkedList[parentId].childIds;
      childrenIds.forEach(childrenId => {
        if(childrenId === id) {
          const childrenIdIndex = childrenIds.indexOf(childrenId);
          childrenIds.splice(childrenIdIndex, 1);
        }
      });
    }

    delete this.queryContentsLinkedList[id];
    delete this.queryString[id];
    
    if(parentId === null) {
      this.queryContentsLinkedList['linked_list_1'] = this.getDefaultGroupContentLinkedList(null);
      this.queryString['linked_list_1'] = '';
      this.queryStringChange.next(this.queryString);
    } else {
      this.callCreateQueryString(parentId);
    }
    this.queryContentChange.next(this.queryContentsLinkedList);
  }

  createQueryString(id: string) {
    const inputValues = this.queryContentsLinkedList[id].inputValues;
    const childIDs = this.queryContentsLinkedList[id].childIds;
    let stringValue = '';
    const isAnd = this.queryContentsLinkedList[id].isAnd ? '&' : '|';
    inputValues.forEach(inputValue => {
      if (stringValue === '') {
        stringValue = this.generateQueryFromInput(inputValue);
      } else {
        stringValue = `${stringValue} ${isAnd} ${this.generateQueryFromInput(inputValue)}`;
      }
    });
    if(childIDs.length > 0) {
      childIDs.forEach(childId => {
        stringValue = this.queryString[childId] !== '' ?`${stringValue} ${isAnd} (${this.queryString[childId]})`: stringValue;
      })
    }
    this.queryString[id] = stringValue !== '' ? `(${stringValue})` : '';
    this.queryStringChange.next(this.queryString);
  }

  generateQueryFromInput(value: queryInput): string {
    const status = value.status;
    const operationName = value.subType === AppConstants.containerSubTypes[1].value ? `(${value.operationName},${value.lookbackHour}.${value.lookbackMinute})` : `(${value.operationName})`;
    const operator = value.type === AppConstants.containerTypes[1].value ? `${this.operatorMapping(value.operator)}${value.value}` : '';
    return status + operationName + operator;
  }

  updateRadioValue(id, value) {
    this.queryContentsLinkedList[id].isAnd = value;
    this.callCreateQueryString(id);
    this.queryContentChange.next(this.queryContentsLinkedList);
  }

  operatorMapping(value) {
    switch(value) {
      case 'equal':
        return '=';
      case 'not_equal':
        return '!=';
      case 'less_than':
        return '<';
      case 'greater_than':
        return '>';
      case 'less_than_or_equal':
        return '<=';
      case 'greater_than_or_equal':
        return '>=';
    }
  }

  callCreateQueryString(id: string) {
    this.createQueryString(id);
    Object.keys(this.queryContentsLinkedList).forEach(key => {
      if(key !== id) {
        this.createQueryString(key);
      }
    });
  }

}
