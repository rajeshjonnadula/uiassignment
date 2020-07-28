import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CreateNewContainerComponent } from './create-new-container/create-new-container.component';
import { CreateContainerDialogComponent } from './create-container-dialog/create-container-dialog.component';
import { ContainerGroupComponent } from './container-group/container-group.component';
import { ContainerConditionComponent } from './container-condition/container-condition.component';
import { SnackbarComponent } from './snackbar/snackbar.component';



@NgModule({
  imports:      [
     BrowserModule,
     FormsModule,
     ReactiveFormsModule,
     BrowserAnimationsModule,
     MatRadioModule,
     MatSelectModule,
     MatInputModule,
     MatDialogModule,
     MatDividerModule,
     MatSnackBarModule,
     MatTooltipModule,
     MatButtonToggleModule
    ],
  declarations: [
    AppComponent,
    CreateNewContainerComponent,
    CreateContainerDialogComponent,
    ContainerGroupComponent,
    ContainerConditionComponent,
    SnackbarComponent
  ],
  entryComponents: [CreateContainerDialogComponent, SnackbarComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
