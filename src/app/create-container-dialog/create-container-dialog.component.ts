import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';
import { queryString } from '../app.interface';

@Component({
  selector: 'app-create-container-dialog',
  templateUrl: './create-container-dialog.component.html',
  styleUrls: ['./create-container-dialog.component.css']
})
export class CreateContainerDialogComponent implements OnInit {
  queryStringSubscription$: Subscription;
  queryString: queryString;
  textAreaValue: string;

  constructor(private appService: AppService) {
    this.queryStringSubscription$ = this.appService.queryStringChange.subscribe((value) => { 
      this.queryString = value;
      this.textAreaValue = this.queryString['linked_list_1'];
    });
  }

  ngOnInit(): void {
  }

}
