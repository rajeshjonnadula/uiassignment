import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateContainerDialogComponent } from '../create-container-dialog/create-container-dialog.component';
import {
  MatSnackBar, MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-create-new-container',
  templateUrl: './create-new-container.component.html',
  styleUrls: ['./create-new-container.component.css']
})
export class CreateNewContainerComponent implements OnInit {

  operationName: string;
  logicalExpression: string;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private appService: AppService) { }

  ngOnInit(): void {
  }

  onConditionBuilderClick() {
    const dialogRef = this.dialog.open(CreateContainerDialogComponent, {
      height: "calc(100% - 30px)",
      width: "calc(100% - 30px)",
      maxWidth: "90%",
      maxHeight: "100%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.logicalExpression = result;
      this.appService.deleteGroup('linked_list_1');
    });
  }

  snackbarConfig = (
    message: string,
    duration: number = 5000
  ) => ({
    duration: duration,
    data: { message },
    verticalPosition: 'top' as MatSnackBarVerticalPosition
  });

  saveJob() {
    this.snackBar.openFromComponent(
      SnackbarComponent,
      this.snackbarConfig(`The ${this.operationName} has been successfully created.`)
    );
  }
  refresh(){
    this.operationName = '';
    this.logicalExpression = '';
    this.appService.deleteGroup('linked_list_1');
  }
}
