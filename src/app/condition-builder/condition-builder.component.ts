import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  result: string;
}

@Component({
  selector: 'app-condition-builder',
  templateUrl: './condition-builder.component.html',
  styleUrls: ['./condition-builder.component.css']
})
export class ConditionBuilderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openCondBuilder(){
    console.log("Trying to open dialog")
    const dgRef = this.dialog.open(builderDialog, {
      width: '250px',
      data: {name: "Rajesh"}
    });

    dgRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      result = result;
    });

  }
}
@Component({
  selector: './builderDialog',
  templateUrl: './builderDialog.html',
})
export class builderDialog {

  constructor(
    public dialogRef: MatDialogRef<builderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
