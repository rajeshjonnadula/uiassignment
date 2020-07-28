import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { queryGroupLinkedList, queryString } from '../app.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-container-group',
  templateUrl: './container-group.component.html',
  styleUrls: ['./container-group.component.css']
})
export class ContainerGroupComponent implements OnInit, OnDestroy {

  @Input() parentId: string = 'linked_list_1';
  groupContent: queryGroupLinkedList;
  queryString: queryString;
  childIds: string[];
  groupContentSubscription$: Subscription;
  queryStringSubscription$: Subscription;
  isAnd: boolean;
  isCollapsed = false;

  constructor(private appService: AppService) {
    this.groupContent = this.appService.getQueryContentsLinkedList();
    this.childIds = this.groupContent[this.parentId].childIds;
    this.isAnd = this.groupContent[this.parentId].isAnd;
    this.groupContentSubscription$ = this.appService.queryContentChange.subscribe((value) => { 
      this.groupContent = value;
      if(this.groupContent[this.parentId]) {
        this.childIds = this.groupContent[this.parentId].childIds;
        this.isAnd = this.groupContent[this.parentId].isAnd;
      }
    });
    this.queryStringSubscription$ = this.appService.queryStringChange.subscribe((value) => { 
      this.queryString = value;
    });
  }

  ngOnInit(): void {
  }

  addConditionContainer() {
    this.appService.addInputValuesLinkedList(this.parentId);
  }

  deleteConditionContainer(index) {
    this.appService.deleteInputValueById(this.parentId, index);
  }

  addGroupContainer() {
    this.appService.addGroupLinkedList(this.parentId);
  }

  deleteGroupContainer() {
    this.appService.deleteGroup(this.parentId);
  }

  isRadioDisabled() {
    const childCount = this.groupContent[this.parentId].childIds.length;
    const inputCount = this.groupContent[this.parentId].inputValues.length;
    return childCount + inputCount < 2;
  }

  onRadioClick(value) {
    this.isAnd = value;
    this.appService.updateRadioValue(this.parentId, value);
  }

  getQueryString() {
   this.appService.callCreateQueryString(this.parentId);
  }

  ngOnDestroy() {
    this.groupContentSubscription$.unsubscribe();
    this.queryStringSubscription$.unsubscribe();
  }

}
