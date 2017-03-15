import {Component} from '@angular/core';
import {MdDialog} from '@angular/material';


@Component({
    moduleId: module.id,
  selector: 'dialog-overview-example',
  templateUrl: './profile.component.html',
})

export class DialogOverviewExample {
  constructor(public dialog: MdDialog) {}

  openDialog() {
    this.dialog.open(DialogOverviewExampleDialog);
  }
}


@Component({
    moduleId: module.id,
  selector: 'dialog-overview-example-dialog',
  templateUrl: './request.component.html',
})
export class DialogOverviewExampleDialog {}
